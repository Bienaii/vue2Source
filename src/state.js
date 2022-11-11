// 状态初始化
export function initState(vm) {
  const opts = vm.$options // 获取所有的选项
  if (opts.data) {
    initData(vm)
  }
}
// data初始化
function initData(vm) {
  let data = vm.$options.data // data可能是函数或对象
  data = typeof data === 'function' ? data.call(vm) : data
}