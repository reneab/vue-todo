<template>
  <div id="app" :class="{ 'dark-theme': isDarkMode }">
    <button @click="toggleTheme">Toggle Theme</button>
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
          completed: false,
          dueDate: null
        }
      ],
      errorMsg: "",
      isDarkMode: false
    };
  },
  methods: {
    deleteItem(id) {
      this.todos = this.todos.filter(e => e.id !== id);
    },
    addItem(newTodo) {
      this.todos.push(newTodo);
    },
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
    }
  },
  created() { // equivalent to init method
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=3")
      .then(res => res.data.forEach(e => this.todos.push({...e, dueDate: null})))
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

.dark-theme {
  background-color: #1e1e1e;
  color: #ffffff;
}

.dark-theme button {
  background-color: #333333;
  color: #ffffff;
  border: 1px solid #ffffff;
}

.dark-theme .error {
  color: #ff69b4; /* A lighter crimson/pink */
}
</style>
