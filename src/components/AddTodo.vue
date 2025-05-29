<template>
  <div>
      <form @submit="addTodo">
          <input type="text" v-model="title" name="title" placeholder="Enter your next task..."/>
          <input type="date" v-model="dueDate" name="dueDate"/>
          <input type="submit" value="Add" class="btn">
      </form>
  </div>
</template>

<script>
// package uuid imported with npm
import uuid from 'uuid';

export default {
    name: "AddTodo",
    data() {
        return {
            title: '',
            dueDate: ''
        }
    },
    methods: {
        addTodo(e) {
            e.preventDefault(); // to prevent the actual submitting and refresh
            const newTodo = {
                id: uuid.v4(),
                title: this.title,
                completed: false,
                dueDate: this.dueDate || null
            }
            // Send up to parent
            this.$emit('add-todo', newTodo);
            this.title = '';
            this.dueDate = '';
        }
    }
}
</script>

<style>
    form {
        display: flex;
        width: 31%;
        margin-right: auto;
        margin-left: auto;
    }

    input[type="text"] {
        flex: 10;
        padding: 5px;
    }

    input[type="date"] {
        flex: 5; /* Adjust as needed */
        padding: 5px;
    }

    input[type="submit"] {
        flex: 2;
    }

    .btn {
        display: inline-block;
        border: none;
        background: #555;
        color: #FFF;
        padding: 7px 20px;
        cursor: pointer;
    }

    .btn:hover {
        background: #666;
    }
</style>