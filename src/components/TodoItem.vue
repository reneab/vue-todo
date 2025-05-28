<template>
  <div>
    <p class="todo-item" v-bind:class="{'is-complete': todo.completed}">
        <input type="checkbox" v-bind:checked="todo.completed" 
            v-on:change="markComplete">
        {{todo.title}}
        <span v-if="todo.dueDate" class="due-date"> (Due: {{ todo.dueDate }})</span>
        <button class="del" @click="$emit('del-todo', todo.id)">X</button>
    </p>
  </div>
</template>

<script>
export default {
    name: "TodoItem",
    props: {
        todo: {}
    },
    methods: {
        markComplete() {
            this.todo.completed = !this.todo.completed;
        }
    }
}
</script>

<style scoped>
    .todo-item {
        background: #F4F4F4;
        padding: 10px;
        /* width: 30%; */
        margin-left: auto;
        margin-right: auto;
        text-align: left;
    }

    .due-date {
        font-size: 0.8em;
        color: #666;
    }

    .is-complete {
        text-decoration: line-through;
    }

    .del {
        background: #de1313;
        color: #FFF;
        border: none;
        padding: 5px 9px;
        border-radius: 50%;
        cursor: pointer;
        float: right;
    }

    .del:hover {
        background: #f55252;
    }

    input[type="checkbox"] {
        cursor: pointer;
    }

</style>