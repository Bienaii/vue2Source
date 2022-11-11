class Observer {
  constructor(data) {
    // Object.defineProperty 只能劫持已经存在的属性，后增的或者删除的是不行的(vue2里面会为此单独写一些api 如$set $delete)
    this.walk(data)
  }
  // 循环对象, 对属性以此劫持
  walk(data) {
    // '重新定义属性' (vue2性能因此差些)
    Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
  }
}

// 定义成响应式的
export function defineReactive(target, key, value) { // 闭包， 属性劫持
  observe(value) // 对所有的对象都进行属性劫持，否则只能劫持一层的数据

  Object.defineProperty(target, key, {
    get() {
      // 取值的时候会执行
      return value
    },
    set(newValue) {
      // 修改的时候会执行
      if(newValue === value) return
      value = newValue
    }
  })
}

// 劫持数据
export function observe(data) {
  if(typeof data !== 'object' || data == null) {
    // 判断对象 只对对象进行劫持
    return
  }

  // 如果一个对象被劫持过了，那就不需要再被劫持了 
  // 要判断一个对象是否被劫持过，可以增添一个实例，用实例来判断
  return new Observer(data)

}