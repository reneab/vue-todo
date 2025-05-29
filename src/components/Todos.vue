<template>
    <div>
        <div v-for="todo in list" v-bind:key="todo.id">
            <TodoItem v-bind:todo="todo" v-on:del-todo="$emit('del-todo', todo.id)" v-on:toggle-complete="$emit('toggle-complete', todo)"/>
        </div>
        <div v-if="list.length == 0 || list.filter(e => e.completed == false).length == 0">
            <h3>Congrats! You have no todos left</h3>
        </div>
    </div>
</template>

<script>
import TodoItem from './TodoItem.vue';

export default {
    name: "Todos",
    components: {
        TodoItem
    },
    props: {
        list: Array
    }
}
</script>

<style scoped>

</style>