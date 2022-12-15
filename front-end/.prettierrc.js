module.exports = {
  tabWidth: 2, // 缩进字节数
  printWidth: 80, // 超过最大值换行
  useTabs: false, // 缩进不使用tab, 使用空格
  semi: false, // 句尾添加分号 |  Hxv: 我觉得不应该加分号，js可以灵活一点
  arrowParens: 'avoid', // Hxv: 避免单括号
  singleQuote: true, // 使用单引号代替双引号
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  bracketSameLine: true,
  trailingComma: 'none', // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 140
      }
    }
  ]
}
