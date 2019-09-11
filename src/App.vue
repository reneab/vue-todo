<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js Todo App" />
    <AddTodo v-on:add-todo="addItem"/>
    <Todos v-bind:list="todos" v-on:del-todo="deleteItem"/>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Todos from "./components/Todos.vue";
import AddTodo from "./components/AddTodo.vue";

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
        { id: 1, title: "Wash bike", completed: false },
        { id: 2, title: "Clean phone", completed: false },
        { id: 3, title: "Take out the trash", completed: true }
      ]
    };
  },
  methods: {
    deleteItem(id) {
      this.todos = this.todos.filter(e => e.id !== id);
    },
    addItem(newTodo) {
      this.todos.push(newTodo);
    }
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
