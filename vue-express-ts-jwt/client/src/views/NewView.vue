<template>
<h3>Hello {{ username }}, you have {{ todos.length }} todos</h3>
<form>
  <div v-for="todo in todos" :key="todo.id">
    <label><input type="checkbox" v-model="todo.completed" /> {{ todo.title }}</label><br>
  </div>
</form>
<hr>

<h3>Hello {{ username }}, you have done 4 items</h3>


  <div v-for="todo in doneTodos" :key="todo.id">
    <p> {{ todo.title }}</p>
  </div>

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
    const doneTodos = ref([
      { id: 1, title: 'This is the first todo', completed: false },
      { id: 2, title: 'This is the second todo', completed: false },
      { id: 3, title: 'This is the third todo', completed: false },
      { id: 4, title: 'This is the fourth todo', completed: false }
    ]);
    return {
      username,
      todos,
      doneTodos
    };
  }
});
</script>