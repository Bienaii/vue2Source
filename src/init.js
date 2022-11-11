import { initState } from "./state";

// 给 Vue 增加 init 方法
export function initMixin(Vue) {
  // 用于初始化数据
  Vue.prototype._init = function (options) {
    const vm = this
    // 将用户的options挂载到实例, 方便后续使用
    vm.$options = options // $开头表示属于Vue自己的属性

    // 初始化状态 prop computed watch等
    initState(vm)
  };
}
