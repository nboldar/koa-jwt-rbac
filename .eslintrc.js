/* spellchecker: disable */
module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  parserOptions: {
    // allow use of object rest/spread properties as well as other ES8 features
    ecmaVersion: 2018,
    // allow use of Ecmascript modules
    sourceType: 'module',
  },
  env: {
    es6: true,
    jest: true,
    node: true,
    commonjs: true,
  },
  plugins: ['prettier'],
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'implicit-arrow-linebreak': 'off',
    'brace-style': [
      'error',
      '1tbs',
      {
        allowSingleLine: true,
      },
    ],
    'curly': ['error', 'multi-line'],
    'consistent-return': 'off',
    'global-require': 'off',
    'max-len': [
      'error',
      {
        code: 80,
        comments: 130,
        ignorePattern: '[^\\n\\r]{115,120}\\{(?:\'|") (?:\'|")\\}',
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-alert': 'off',
    'no-confusing-arrow': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'prefer-promise-reject-errors': 'warn',
    'prefer-template': 'warn',
    'semi': [
      'error',
      'always',
      {
        omitLastInOneLineBlock: true,
      },
    ],
  },
};
