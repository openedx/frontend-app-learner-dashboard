const { createConfig } = require('@openedx/frontend-build');

const config = createConfig('eslint', {
  rules: {
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-self-import': 'off',
    'import/no-import-module-exports': 'off',
    'spaced-comment': ['error', 'always', { 'block': { 'exceptions': ['*'] } }],
  },
});

config.settings = {
  "import/resolver": {
    node: {
      paths: ["src", "node_modules"],
      extensions: [".js", ".jsx"],
    },
  },
};

module.exports = config;
