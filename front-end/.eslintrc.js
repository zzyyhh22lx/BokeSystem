module.exports = {
  // todo: 本配置参考其他vue3+typeScript项目，每个配置项是否有意义需要进一步确认。
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    'vue/v-on-event-hyphenation': 'off',
    'vue/custom-event-name-casing': 'off',
    'vue/component-definition-name-casing': 'off',
    'vue/attributes-order': 'off',
    'vue/one-component-per-file': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/html-self-closing': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-arrow-functions-in-watch': 'off',
    'vue/no-v-html': 'off',
    'vue/comment-directive': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/require-prop-types': 'off',
    'no-useless-escape': 'off',
    'no-sparse-arrays': 'off',
    'no-use-before-define': 'off',
    'no-case-declarations': 'off',
    'no-console': 'off',
    'vue/html-indent': 'off',

    // 以下为根据checklist新增配置项
    'spaced-comment': ['error', 'always'],
    'no-multi-assign': 'error',
    indent: ['error', 2],
    'no-undef-init': 'error',
    'no-var': 'error',
    'max-len': ['error', { code: 120, tabWidth: 4, ignoreStrings: true }],
    'max-lines-per-function': ['error', { max: 50 }],
    'max-depth': ['error', { max: 4 }],
    'max-nested-callbacks': ['error', 4],
    'no-prototype-builtins': ['error'],
    'no-regex-spaces': ['error'],
    'no-eval': 'error',
    'no-with': 'error',
    'no-alert': 'error',
    'no-debugger': 'off',
    complexity: ['error', 20],
    'max-params': ['error', 5],
    'prefer-destructuring': ['error', { object: true, array: false }],
    quotes: ['error', 'single'],
    'no-negated-condition': 'error',
    'no-nested-ternary': 'error',
    eqeqeq: ['error', 'always', { null: 'always' }],
    'no-new-wrappers': 'error',
    'no-proto': 'error',
    'prefer-template': 'error',
    'prefer-spread': 'error'
  },
  globals: {
    window: true,
    NodeJS: true
  },
  overrides: [
    {
      // 我试着拆了很久，发现依靠闭包实现的方法很难拆分为小函数
      files: ['packages/shared/src/global-state/**'],
      rules: {
        'max-lines-per-function': ['error', { max: 180 }]
      }
    }
  ]
}
