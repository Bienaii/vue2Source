import { initMixin } from "./init";

// 将所有方法耦合在一起
function Vue(options) {
  // options就是选项
  debugger
  this._init(options); // 默认就调用了init
}

initMixin(Vue); // 扩展了init方法

export default Vue
