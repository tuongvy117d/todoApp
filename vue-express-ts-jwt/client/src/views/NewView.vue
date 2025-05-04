<template>
<div class="todo-container">
  <h3 class="greeting">Hello {{ username }}, you have {{ todos.length }} todos</h3>
  <form class="todo-list">
    <div v-for="todo in todos" :key="todo.id" class="todo-item">
      <label><input type="checkbox" v-model="todo.completed" /> {{ todo.title }}</label>
    </div>
  </form>
  <hr class="divider">

  <h3 class="greeting">Hello {{ username }}, you have done {{ doneTodos.length }} items</h3>

  <div class="done-list">
    <div v-for="todo in doneTodos" :key="todo.id" class="done-item">
      <p>{{ todo.title }}</p>
    </div>
  </div>
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

.greeting {
  color: #333;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.todo-list, .done-list {
  margin-bottom: 20px;
}

.todo-item, .done-item {
  padding: 12px;
  margin-bottom: 8px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.todo-item:hover, .done-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}

.todo-item label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.todo-item input[type="checkbox"] {
  margin-right: 10px;
  height: 18px;
  width: 18px;
}

.divider {
  border: 0;
  height: 1px;
  background-color: #ddd;
  margin: 30px 0;
}

.done-item {
  background-color: #f0f7ff;
}

.done-item p {
  margin: 0;
  color: #555;
}
</style>