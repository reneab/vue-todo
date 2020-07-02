<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js Todo App" />
    <AddTodo v-on:add-todo="addItem" />
    <p class="error">{{ errorMsg }}</p>
    <Todos v-bind:list="todos" v-on:del-todo="deleteItem" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Todos from "./components/Todos.vue";
import AddTodo from "./components/AddTodo.vue";
import axios from "axios"; // npm library for HTTP requests
import uuid from 'uuid';

export default {
  name: "app",
  components: {
    HelloWorld,
    Todos,
    AddTodo
  },
  data() {
    return {
      todos: [
        {
          id: uuid.v4(),
          title: "A default, hard-coded todo",
          completed: false
        }
      ],
      errorMsg: ""
    };
  },
  methods: {
    deleteItem(id) {
      this.todos = this.todos.filter(e => e.id !== id);
    },
    addItem(newTodo) {
      this.todos.push(newTodo);
    }
  },
  created() {
    // equivalent to init method
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=3")
      .then(res => res.data.forEach(e => this.todos.push(e)))
      .catch(err => this.errorMsg = err);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

img {
  height: 50px;
}

.error { color: crimson}
</style>
