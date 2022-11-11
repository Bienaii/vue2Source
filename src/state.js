import { observe } from "./observe/index"

// 状态初始化
export function initState(vm) {
  const opts = vm.$options // 获取所有的选项
  if (opts.data) {
    initData(vm)
  }
}

// 代理方法
function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      // console.log('get');
      return vm[target][key] // vm._data.name
    },
    set(newValue) {
      // console.log('set');
      vm[target][key] = newValue
    }
  })
}
// data初始化
function initData(vm) {
  let data = vm.$options.data // data可能是函数或对象
  data = typeof data === 'function' ? data.call(vm) : data  // data是用户返回的对象

  vm._data = data // 将返回的对象data放到了vm._data上，这样在vm里才能直接访问到data，同时在下方又进行了劫持

  // 对数据进行劫持 defineProperty
  observe(data)

  // 将vm._data 用 vm 来代理，即之后只需要vm.name访问即可，而不需要vm._data.name
  for (const key in data) {
    proxy(vm, '_data', key) 
  }
}