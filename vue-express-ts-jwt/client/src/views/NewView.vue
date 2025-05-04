<template>
<h3>Hello {{ username }}, you have {{ todos.length }} todos</h3>
<form>
  <div v-for="todo in todos" :key="todo.id">
    <label><input type="checkbox" v-model="todo.completed" /> {{ todo.title }}</label><br>
  </div>
</form>
<h3>That is all, {{ username }}</h3>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const username = ref('Bate');
    
    // Sample todo list
    const todos = ref([
      { id: 1, title: 'Learn Vue 3', completed: false },
      { id: 2, title: 'Build a todo app', completed: false },
      { id: 3, title: 'Master TypeScript', completed: false },
      { id: 4, title: 'Play game', completed: false }
    ]);
    
    return {
      username,
      todos
    };
  }
});
</script>