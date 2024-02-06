import pluginNode from 'eslint-plugin-n';

export function node() {
  return [pluginNode.configs['flat/recommended']];
}
