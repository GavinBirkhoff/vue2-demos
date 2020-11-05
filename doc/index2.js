console.log(Vue);
// 声明式渲染
var app = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue!",
  },
});
var app2 = new Vue({
  el: "#app-2",
  data: {
    message: "页面加载于 " + new Date().toLocaleString(),
  },
});
var app3 = new Vue({
  el: "#app-3",
  data: {
    seen: true,
  },
});
var app4 = new Vue({
  el: "#app-4",
  data: {
    todos: [
      { text: "学习 JavaScript" },
      { text: "学习 Vue" },
      { text: "整个牛项目" },
    ],
  },
});
var app5 = new Vue({
  el: "#app-5",
  data: {
    message: "Hello Vue.js!",
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split("").reverse().join("");
    },
  },
});
var app6 = new Vue({
  el: "#app-6",
  data: {
    message: "Hello Vue!",
  },
});
Vue.component("todo-item", {
  // todo-item 组件现在接受一个
  // "prop"，类似于一个自定义 attribute。
  // 这个 prop 名为 todo。
  props: ["todo"],
  template: "<li>{{ todo.text }}</li>",
});
var app7 = new Vue({
  el: "#app-7",
  data: {
    groceryList: [
      { id: 0, text: "蔬菜" },
      { id: 1, text: "奶酪" },
      { id: 2, text: "随便其它什么人吃的东西" },
    ],
  },
});
var app8 = new Vue({
  el: "#app-8",
  data: {
    message: "Hello",
    now: Date.now(), //并不会变化
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      console.log(`app8 computed reversedMessage`);
      return this.message.split("").reverse().join("");
    },
    nowComputed: function () {
      return Date.now(); //并不会变化
    },
  },
});

var app9 = new Vue({
  el: "#app-9",
  data: {
    message: "Hello",
  },
  methods: {
    reversedMessage: function () {
      console.log(`app9 computed function reversedMessage`);
      return this.message.split("").reverse().join("");
    },
  },
});

var app10 = new Vue({
  el: "#app-10",
  data: {
    firstName: "Foo",
    lastName: "Bar",
    fullName: "Foo Bar",
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + " " + this.lastName;
    },
    lastName: function (val) {
      this.fullName = this.firstName + " " + val;
    },
  },
});
// 计算属性
// var vm = new Vue({
//   el: "#demo",
//   data: {
//     firstName: "Foo",
//     lastName: "Bar",
//   },
//   computed: {
//     fullName: function () {
//       return this.firstName + " " + this.lastName;
//     },
//   },
// });
var app11 = new Vue({
  el: "#app-11",
  data: {
    isActive: true,
    error: null,
  },
  computed: {
    classObject: function () {
      return {
        active: this.isActive && !this.error,
        "text-danger": this.error && this.error.type === "fatal",
      };
    },
  },
});
var app12 = new Vue({
  el: "#app-12",
  data: {
    message: 123,
    checked: true,
  },
});
// 组件
Vue.component("blog-post", {
  props: ["post"],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <button v-on:click="$emit('enlarge-text', 0.1)">
        Enlarge text
      </button>
      <div v-html="post.content"></div>
    </div>
  `,
});

Vue.component("custom-input", {
  props: ["value"],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `,
});
Vue.component("alert-box", {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `,
});

var app13 = new Vue({
  el: "#blog-post-demo",
  data: {
    posts: [
      { id: 1, title: "My journey with Vue" },
      { id: 2, title: "Blogging with Vue" },
      { id: 3, title: "Why Vue is so fun" },
    ],
    postFontSize: 1,
    searchText: "search",
  },
  methods: {
    onEnlargeText: function (enlargeAmount) {
      this.postFontSize += enlargeAmount;
    },
  },
});

Vue.component("tab-home", {
  template: "<div>Home component</div>",
});
Vue.component("tab-posts", {
  template: "<div>Posts component</div>",
});
Vue.component("tab-archive", {
  template: "<div>Archive component</div>",
});

var app14 = new Vue({
  el: "#dynamic-component-demo",
  data: {
    currentTab: "Home",
    tabs: ["Home", "Posts", "Archive"],
  },
  computed: {
    currentTabComponent: function () {
      return "tab-" + this.currentTab.toLowerCase();
    },
  },
});

var app15 = new Vue({
  el: "#transition-demo",
  data: {
    show: true,
  },
});
