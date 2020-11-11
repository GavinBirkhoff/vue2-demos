# vue2-demos
首先以doc/index2.x.html为例子讲述了vue基本应用
## 基础案例

var app~app7
声明式渲染
属性绑定
条件渲染
循环渲染
事件监听器
表单输入和应用状态之间的双向绑定
组件化应用构建

## VUE 实例

new Vue 的时候会把 data 中的 property 设置到 vue 实例中，data 中的 property 和实例中注册的相互响应。
值得注意的是 vue 实例后来自己添加的不会响应。

```js
vm.$data === data; // => true
vm.$el === document.getElementById("example"); // => true

// $watch 是一个实例方法
vm.$watch("a", function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
});
```

声明周期见图谱

## 模板语法

**差值**
文本，原始 HTML，属性，JavaScript 表达式
**指令**
v-once 能执行一次性地插值，当数据改变时，插值处的内容不会更新。
v-html 你的站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 XSS 攻击。
v-bind 对于布尔 attribute (它们只要存在就意味着值为 true)

**指令** v-if="seen"
**参数** v-bind:href="url"
**动态参数** v-bind:[attributeName]="url" 动态参数预期会求出一个字符串，异常情况下值为 null。这个特殊的 null 值可以被显性地用于移除绑定。任何其它非字符串类型的值都将会触发一个警告。动态参数表达式有一些语法约束。
**修饰符** v-on:submit.prevent="onSubmit"

## 计算属性

计算属性中依赖的响应式值发生改变，属性计算函数重新执行，也就是这里存在缓存。
计算属性默认只有一个 getter
给计算属性添加一个 setter

```js
computed: {
fullName: {
// getter
get: function () {
return this.firstName + ' ' + this.lastName
},
// setter
set: function (newValue) {
var names = newValue.split(' ')
this.firstName = names[0]
this.lastName = names[names.length - 1]
}
}
}
```

## 计算属性 vs 方法

依赖 property 改变都将重新执行
相比之下，每当触发重新渲染时，调用方法将总会再次执行函数。

## [计算属性 vs 侦听属性](https://cn.vuejs.org/v2/guide/computed.html#计算属性-vs-侦听属性)

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 `watch` 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的

## Class 与 Style 绑定

其实这里没啥的，和react也几乎差不多，只是语法上有些特殊。

## 条件渲染

v-if v-else-if v-else

注意点顺序要注意，要紧连着。

被追加key属性的元素不会被复用。

v-if类似react中的条件渲染

v-show 只是通过css隐藏。

当 `v-if` 与 `v-for` 一起使用时，`v-for` 具有比 `v-if` 更高的优先级。

## 列表渲染

v-for

在 `v-for` 块中，我们可以访问所有父作用域的 property

你也可以用 `of` 替代 `in` 作为分隔符，因为它更接近 JavaScript 迭代器的语法

```
v-for="item of items"
```

遍历数组

```
v-for="(item, index) in items"
```

遍历对象

```
v-for="(value, name, index) in object"
```

用于值

```
 v-for="n in 10"
```

注意key和react一样

## 事件处理

这里有些违背原生力量，不如react灵活。

以后做下源码分析，才能更好的理解。

## 表单输入绑定

`v-model` 会忽略所有表单元素的 `value`、`checked`、`selected` attribute 的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 `data` 选项中声明初始值。

`v-model` 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：

- text 和 textarea 元素使用 `value` property 和 `input` 事件；
- checkbox 和 radio 使用 `checked` property 和 `change` 事件；
- select 字段将 `value` 作为 prop 并将 `change` 作为事件。

如果 `v-model` 表达式的初始值未能匹配任何选项，`<select>` 元素将被渲染为“未选中”状态。在 iOS 中，这会使用户无法选择第一个选项。因为这样的情况下，iOS 不会触发 change 事件。因此，更推荐像上面这样提供一个值为空的禁用选项。

就是通过model去把元素有用的值绑定赋值到了property上而已

```js
<!-- 当选中时，`picked` 为字符串 "a" -->
<input type="radio" v-model="picked" value="a">

<!-- `toggle` 为 true 或 false -->
<input type="checkbox" v-model="toggle">

<!-- 当选中第一个选项时，`selected` 为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

**但是有时我们可能想把值绑定到 Vue 实例的一个动态 property 上，这时可以用 `v-bind` 实现，并且这个 property 的值可以不是字符串。**

## 组件

```js
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

这里的data注意的是函数，函数才能完成独立拷贝。

注意prop和监听子组件事件

记住在组件上使用v-model

## 动态组件

请留意，这个 attribute 可以用于常规 HTML 元素，但这些元素将被视为组件，这意味着所有的 attribute **都会作为 DOM attribute 被绑定**。对于像 `value` 这样的 property，若想让其如预期般工作，你需要使用 [`.prop` 修饰器](https://cn.vuejs.org/v2/api/#v-bind)。

到目前为止，关于动态组件你需要了解的大概就这些了，如果你阅读完本页内容并掌握了它的内容，我们会推荐你再回来把[动态和异步组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html)读完。

缓存失活组件用

```js
<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```



## [解析 DOM 模板时的注意事项](https://cn.vuejs.org/v2/guide/components.html#解析-DOM-模板时的注意事项)

有些 HTML 元素，诸如 `<ul>`、`<ol>`、`<table>` 和 `<select>`，对于哪些元素可以出现在其内部是有严格限制的。而有些元素，诸如 `<li>`、`<tr>` 和 `<option>`，只能出现在其它某些特定的元素内部。

## 异步组件

## 局部组件

## prop

单向流，不能能不更改和react很像。

用prop来做数据基数的时候，定义一个data property来解决，和react中的props变换成state类似。

自带[Prop 验证](https://cn.vuejs.org/v2/guide/components-props.html#Prop-验证)

prop的类型检测

有了 `inheritAttrs: false` 和 `$attrs`，你就可以手动决定这些 attribute 会被赋予哪个元素。在撰写[基础组件](https://cn.vuejs.org/v2/style-guide/#基础组件名-强烈推荐)的时候是常会用到的

注意 `inheritAttrs: false` 选项**不会**影响 `style` 和 `class` 的绑定。

## 自定义事件

**事件名字**

不同于组件和 prop，事件名不存在任何自动化的大小写转换。

v-on的修饰符需要注意下

## 插槽

slot和react的children下不多

## 处理边界

...

## 过渡 & 动画

Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。包括以下工具：

- 在 CSS 过渡和动画中自动应用 class

- 可以配合使用第三方 CSS 动画库，如 Animate.css

- 在过渡钩子函数中使用 JavaScript 直接操作 DOM

- 可以配合使用第三方 JavaScript 动画库，如 Velocity.js

  

## 混入

本质就是继承合并

## 自定义指令

# VUE源码分析

版本2.6.12

## Vue构造函数的加工

**在Vue原型上和Vue静态上**

创建vue的构造函数,然后通过init,state,events,lifecyle,rendeer的混入.

```js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```

initMixin仅在Vue.prototype上添加了_init()

stateMixin首先在Vue.prototype上定义了\$data and \$props,设置了getter返回实例的\_data和\_props

接着声明了$set 和 \$delete 为set和del 他们来自observer文件中的方法定义

接着声明了$watch

稍后会探索具体函数内容,以上简单来看就是在Vue原型上添加了$ data props set delete watch

eventsMixin在Vue的prototype上添加了$on once off emit

lifecycleMixin在Vue的prototype上添加了_update $forceUpdate \$destroy

renderMixin首先在Vue的prototype上添加了

```js
  target._o = markOnce
  target._n = toNumber
  target._s = toString
  target._l = renderList
  target._t = renderSlot
  target._q = looseEqual
  target._i = looseIndexOf
  target._m = renderStatic
  target._f = resolveFilter
  target._k = checkKeyCodes
  target._b = bindObjectProps
  target._v = createTextVNode
  target._e = createEmptyVNode
  target._u = resolveScopedSlots
  target._g = bindObjectListeners
  target._d = bindDynamicKeys
  target._p = prependModifier
```

接着添加了$nextTick 和 _render

## Vue的_init

性能mark以后说

首先说下

```js
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
```

把创建Vue实例的options和Vue的options合成一个options保存在$options上

接着在开发模式设置了vm._renderProxy 代理vm

vm._self = vm

initLifecycle 给vm添加了$parent root children refs _watcher inactive directInactive isMounted isDestroyed isBeingDestroyed

initEvents vm添加了_events _hasHookEvent

# VUE单独文件

Project setup
```
yarn install
```
Compiles and hot-reloads for development
```
yarn serve
```
Compiles and minifies for production
```
yarn build
```
Lints and fixes files
```
yarn lint
```
Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).