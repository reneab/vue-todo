<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js Todo App" />
    <AddTodo v-on:add-todo="addItem" />
    <p class="error">{{ errorMsg }}</p>
    <Todos v-bind:list="todos" v-on:del-todo="deleteItem" v-on:toggle-complete="toggleComplete" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Todos from "./components/Todos.vue";
import AddTodo from "./components/AddTodo.vue";
import axios from "axios"; // npm library for HTTP requests

export default {
  name: "app",
  components: {
    HelloWorld,
    Todos,
    AddTodo
  },
  data() {
    return {
      todos: [], // Initialize as an empty array
      errorMsg: ""
    };
  },
  methods: {
    deleteItem(id) {
      axios.delete(`http://localhost:3000/api/todos/${id}`)
        .then(() => {
          this.todos = this.todos.filter(e => e.id !== id);
        })
        .catch(err => this.errorMsg = err.message || 'Error deleting item');
    },
    addItem(newTodoFromForm) {
      axios.post("http://localhost:3000/api/todos", { title: newTodoFromForm.title, dueDate: newTodoFromForm.dueDate })
        .then(res => {
          this.todos.push(res.data);
        })
        .catch(err => this.errorMsg = err.message || 'Error adding item');
    },
    toggleComplete(todoItem) {
      axios.put(`http://localhost:3000/api/todos/${todoItem.id}`, { completed: !todoItem.completed })
        .then(res => {
          const index = this.todos.findIndex(t => t.id === res.data.id);
          if (index !== -1) {
            this.todos.splice(index, 1, res.data);
          }
        })
        .catch(err => this.errorMsg = err.message || 'Error updating item');
    }
  },
  created() {
    axios.get("http://localhost:3000/api/todos")
      .then(res => {
        this.todos = res.data;
      })
      .catch(err => this.errorMsg = err.message || 'Error fetching todos');
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
