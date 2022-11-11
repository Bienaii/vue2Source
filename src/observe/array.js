// 重写数组中的部分方法
let oldArrayProto = Array.prototype // 获取数组的原型

// newArrayProto.__proto__ = oldArrayProto
// 使用Object.create()来实现创建一个对象，在该对象添加了与父类同名属性之前，调用的都是父类的属性。在添加了与父类同名属性之后，在调用就是用的自己的自身属性
export let newArrayProto = Object.create(oldArrayProto)

// 找到所有的变异方法
let methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'reverse',
  'sort',
  'splice',
] // concat slice等其他方法都不会改变原数组，因此不需要

methods.forEach(method => {
  // Array.push(1,2,3)
  newArrayProto[method] = function(...args) { // 这里重写了数组的方法 
    // push.call(arr)
    const result = oldArrayProto[method].call(this, ...args) // 内部调用原来的方法 函数的劫持 (切片编程)
    console.log(method,'method');
    // 另外，需要对新增的数据再次进行劫持
    let inserted;
    let ob = this.__ob__;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break;
      case 'splice':
        inserted.args.slice(2)
      default:
        break;
    }
    console.log(inserted,' inserted') // 新增的内容 
    if (inserted) {
      // 对新增的数据再次进行劫持
      ob.observeArray(inserted)
    }
    return result
  }
})