import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import yargs from 'yargs/yargs';
import { execa, type Options as ExecaOptions } from 'execa';
import colors from 'picocolors';
import semver from 'semver';
import inquirer from 'inquirer';
import { version as currentVersion } from '../package.json';

const args = yargs(process.argv.slice(2))
  .options({ dryRun: { type: 'boolean', alias: 'dry' } })
  .options({ skipGit: { type: 'boolean', default: false } })
  .parseSync();

const isDryRun = args.dryRun;
const skipGit = !!args.skipGit;

const run = (
  bin: string,
  args: readonly string[],
  options: ExecaOptions = {}
) => execa(bin, args, { stdio: 'inherit', ...options });

const dryRun = (
  bin: string,
  args: readonly string[],
  options: ExecaOptions = {}
) => {
  console.log(colors.blue(`[dryrun] ${bin} ${args.join(' ')}`), options);
};

const runIfNotDry = isDryRun ? dryRun : run;

const readJson = (file: string) => fsp.readFile(file, 'utf-8').then(JSON.parse);
const writeJson = (file: string, content: any) =>
  fsp.writeFile(file, JSON.stringify(content, null, 2) + '\n', 'utf-8');

const versionIncrements = ['patch', 'minor', 'major'];

function updatePackageJson(
  packageJson: any,
  version: string,
  packages: string[]
) {
  packageJson.version = version;

  for (const depType of [
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'optionalDependencies'
  ]) {
    const deps = Object.keys(packageJson[depType] || {});
    for (const dep of deps) {
      if (packages.includes(dep)) {
        packageJson[depType][dep] = `^${version}`;
        console.log(
          colors.yellow(
            `${packageJson.name} ${depType}: ${dep}@${packageJson[depType][dep]} => ${dep}@^${version}`
          )
        );
      }
    }
  }
}

async function main() {
  let targetVersion = String(args._[0] || '');

  if (versionIncrements.includes(targetVersion)) {
    targetVersion = semver.inc(currentVersion, targetVersion);
  } else if (!targetVersion || !semver.valid(targetVersion)) {
    if (targetVersion) {
      console.warn(colors.yellow(`Version "${targetVersion}" in invalid`));
    }

    const { version: target } = await inquirer.prompt([
      {
        type: 'list',
        name: 'version',
        message: 'Please select a release type',
        choices: versionIncrements.concat(['custom'])
      }
    ]);
    if (target === 'custom') {
      const answer = await inquirer.prompt([
        {
          type: 'input',
          message: 'Please input custom version',
          name: 'version'
        }
      ]);

      if (!semver.valid(answer.version)) {
        throw new Error(`Invalid target version: ${answer.version}`);
      }
      targetVersion = answer.version;
    } else {
      targetVersion = semver.inc(currentVersion, target);
    }
  }

  await execa('pnpm', ['run', '-r', 'build']);
  await execa('pnpm', ['run', 'lint']);

  const folders = (await fsp.readdir('packages')).map((folder) =>
    path.join('packages', folder)
  );

  const packageJsonFiles = folders
    .map((folder) => {
      const packageJsonFile = path.join(folder, 'package.json');
      if (!fs.existsSync(packageJsonFile)) {
        return null;
      }
      return packageJsonFile;
    })
    .filter(Boolean) as string[];

  const packageJsons = await Promise.all(
    packageJsonFiles.map(async (file) => {
      const content = await readJson(file);
      return {
        file,
        content
      };
    })
  );

  const pkgNames = packageJsons.map((pkg) => pkg.content.name);

  const { y: confirmVersionUpdate } = await inquirer.prompt([
    {
      message: `Version release: ${currentVersion} => ${targetVersion}`,
      type: 'confirm',
      name: 'y'
    }
  ]);
  if (!confirmVersionUpdate) {
    return;
  }

  const rootPackageJson = await readJson('package.json');
  rootPackageJson.version = targetVersion;
  await writeJson('package.json', rootPackageJson);

  for (const { file, content } of packageJsons) {
    updatePackageJson(content, targetVersion, pkgNames);
    await writeJson(file, content);
  }

  if (!skipGit) {
    await runIfNotDry('git', ['add', '-A']);
    await runIfNotDry('git', ['commit', '-m', `release: v${targetVersion}`]);
    await runIfNotDry('git', ['tag', `v${targetVersion}`]);
  }

  const publishArgs: string[] = [];
  if (isDryRun) {
    publishArgs.push('--dry-run');
  }
  if (isDryRun || skipGit) {
    publishArgs.push('--no-git-checks');
  }

  await run('pnpm', ['-r', 'publish', '--access', 'public', ...publishArgs]);
  if (!skipGit) {
    await runIfNotDry('git', ['push', 'origin', `refs/tags/v${targetVersion}`]);
    await runIfNotDry('git', ['push']);
  }
}

main();
