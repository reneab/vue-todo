<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js Todo App. From Rene" />
    <AddTodo v-on:add-todo="addItem"/>
    <Todos v-bind:list="todos" v-on:del-todo="deleteItem"/>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Todos from "./components/Todos.vue";
import AddTodo from "./components/AddTodo.vue";
import axios from 'axios'; // npm library for HTTP requests 

export default {
  name: "app",
  components: {
    HelloWorld,
    Todos,
    AddTodo
  },
  data() {
    return {
      todos: []
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
  created() { // equivalent to init method
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=3')
      .then(res => this.todos = res.data)
      .catch(err => console.error(err))
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
</style>
