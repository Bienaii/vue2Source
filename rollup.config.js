// rollup默认可以导出一个对象，作为打包的配置文件
import babel from 'rollup-plugin-babel'
export default {
  input: './src/index.js', // 入口
  output: {
    file: './dist/vue.js', // 出口
    name:  'Vue', // global.Vue  表示打包后会在全局增加一个Vue
    format: 'umd', // 打包的格式  esm(es6) commonjs模块 iife自执行函数  umd(统一模块规范 兼容cjs  amd iife)
    sourcemap:  true, // 表示可以调试源代码
    // 使用插件  **所有的插件都是函数
    plugins: [
      // es6语法转es5
      babel({
        // 默认读取了.babelrc里的presets
        exclude: 'node_modules/**' // 排除node_modules所有文件 都是第三方提供的，不需要再转es5语法
      })
    ]

  }
}