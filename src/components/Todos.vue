<template>
    <div>
        <!-- TODO: Display message if list is empty -->
        <div v-for="todo in list" v-bind:key="todo.id">
            <TodoItem v-bind:todo="todo" v-on:del-todo="$emit('del-todo', todo.id)"/>
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