import { newArrayProto } from "./array"

class Observer {
  constructor(data) {
    // Object.defineProperty 只能劫持已经存在的属性，后增的或者删除的是不行的(vue2里面会为此单独写一些api 如$set $delete)
    // data.__ob__ = this // 此写法会造成死循环
    //使 array.js 中的this, 能够调用监测方法observeArray; 且给数据加了一个标识，如果数据上有__ob__，则说明这个属性被监测过
    Object.defineProperty(data, '__ob__', {
      value: this,
      enumerable: false // 将__ob__ 变成不可枚举（循环时无法取值，避免了上面写法出现的递归死循环）
    })
    // 修改数组很少用索引来操作数据， 因为array[9999]写代码，内部做劫持会浪费性能(挨个遍历劫持)
    // 一般修改数组，都是通过方法来修改 push shift等
    // 因此数组劫持应该区别对象，另外处理; 做法：重写数组中的方法 7个变异方法(push、pop、shift、unshift、splice、sort、reverse 会修改数组本身)
    if(Array.isArray(data)) {
      // 数组
      data.__proto = newArrayProto //需要保留数组原有的特性，并且可以重写部分方法
      this.observeArray(data) // 考虑数组元素为引用类型的情况，这样就可以也监测到
    } else {
      // 对象
      this.walk(data)
    }

  }
  // 循环对象, 对属性以此劫持
  walk(data) {
    // '重新定义属性' (vue2性能因此差些)
    Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
  }
  // 对数组里的每一项进行监测
  observeArray(data) {
    data.forEach(item => observe(item))
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
      observe(newValue) // 防止value是个对象，因此可以再次劫持
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

  if(data.__ob__ instanceof Observer)  {
    // 说明这个对象被劫持过了
    return data.__ob__
  }

  // 如果一个对象被劫持过了，那就不需要再被劫持了 
  // 要判断一个对象是否被劫持过，可以增添一个实例，用实例来判断
  return new Observer(data)

}