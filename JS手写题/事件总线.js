/*
事件总线 (EventBus) ，也可以说是 观察者模式，还可以说是 发布-订阅模式

它的作用是 可以在两个互不相干的的 组件之间 进行彼此的通信，起到数据传输的作用。

发布-订阅模式，就是在一个对象被修改或者触发时，即 状态改变 时

则所有依赖于它的对象都会立即 得到通知 并且 会进行 自动更新

发布者，为 被观察者，就是 状态改变 时，负责通知所有订阅者

订阅者，为 观察者。就是 得到通知，进行事件处理
创造一个EventBus类
通过 on 方法进行 发布事件，传入事件名和函数，保存并创建事件名，将事件函数放入到数组中。
通过 emit 方法进行 订阅事件，跟据传入的事件名，找到对应对象后，遍历数组，触发调用每个函数
通过 off 方法进行 事件销毁，跟据传入的事件名 和 函数，找到对应对象后，判断 函数是否存在，如果存在的话，通过 filter 方法过滤数组，找到对应的数组方法后，进行删除。否则的话，将该对象中所有的数据进行删除。
通过 once 方法进行 单次事件注册，该注册的事件，如果执行一次，即可删除。
prependListener 从头部加入调用on
以上是常用的 事件总线 的内部方法。
*/
class Event {
  constructor() {
    this.events = {}
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }

    this.events[eventName].push({
      handler: callback
    })
  }

  once(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }

    this.events[eventName].push({
      handler: callback,
      once: true
    })
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) return
    this.events[eventName].forEach((item, index) => {
      item.handler(...args)
      if (item.once) {
        this.events[eventName].splice(index, 1)
      }
    })
  }

  off(eventName, callback) {
    if (this.events[eventName]) {
      if (callback) {
        this.events[eventName] = this.events[eventName].filter((v) => v.handler !== callback)
      } else {
        delete this.events[eventName]
      }
    }
  }
}