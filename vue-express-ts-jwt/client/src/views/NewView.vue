<template>
<div class="todo-container">
 <span>hello{{ name }}</span>
    <h1>{{ name }}'s todo list</h1>
    <div v-for="todo in todos">
      <p>{{ todo.todo }}</p>
      <p>done:{{ todo.done }}</p>
      <p>deadline:{{ todo.deadline }}</p>
      <hr>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    var name = "Vy";
    var todos = [
      {todo: "Buy groceries (milk, eggs, bread)", done: true, id: 1, deadline: "2025-01-03"},
      {todo: "Finish Vue.js project report", done: false, id: 2, deadline: "2025-01-05"},
      {todo: "Call the dentist to reschedule appointment", done: false, id: 3, deadline: "2025-01-04"},
      {todo: "Book flight tickets for vacation", done: false, id: 4, deadline: "2025-02-10"},
      {todo: "Read 'Atomic Habits' book", done: false, id: 5, deadline: "2025-01-20"},
      {todo: "Clean the garage", done: true, id: 6, deadline: "2025-01-02"},
      {todo: "Prepare presentation for Monday meeting", done: false, id: 7, deadline: "2025-01-06"},
    ]
    return {
      name,
      todos,
    };
  },
  
});
</script>

<style scoped>
.todo-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>