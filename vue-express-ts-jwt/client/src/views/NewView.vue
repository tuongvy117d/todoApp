<template>
<div class="todo-container">
  <h3 class="greeting">Hello {{ username }}, you have {{ todos.length }} todos</h3>
  <form class="todo-list">
    <div v-for="todo in todos" :key="todo.id" class="todo-item">
      <label :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
        <input type="checkbox" v-model="todo.completed" />
        <span>
          {{ todo.title }}
        </span>
        <span v-if="todo.categories.includes('Learning')">(L)</span>
        <span v-if="todo.categories.includes('Random')">(R)</span>
      </label>
      
    </div>
  </form>
  <hr class="divider">

  
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const username = ref('Bate');
    
    // Sample todo list
    const todos = ref([
      { id: 1, title: 'Learn Vue 3', completed: false , categories: "Learning"},
      { id: 2, title: 'Build a todo app', completed: false, categories: "Learning, Random" },
      { id: 3, title: 'Master TypeScript', completed: false, categories: "Random"  },
      { id: 4, title: 'Play game', completed: false, categories: "Learning"  },
      { id: 5, title: 'This is the first todo', completed: true, categories: "Random"  },
      { id: 6, title: 'This is the second todo', completed: true, categories: "Random, Learning"  },
      { id: 7, title: 'This is the third todo', completed: true, categories: "Learning"  },
      { id: 8, title: 'This is the fourth todo', completed: true, categories: "Learning"  }
    ]);
    return {
      username,
      todos,
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

.todo-item input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #413cda;
  border-radius: 4px;
  margin-right: 10px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.todo-item input[type="checkbox"]:checked {
  background-color: #ff4d6d;
  border-color: #ff4d6d;
}

.todo-item input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  animation: checkmark 0.2s ease-in-out;
}

.todo-item input[type="checkbox"]:hover {
  border-color: #ff8fab;
  box-shadow: 0 0 5px rgba(255, 77, 109, 0.3);
}

@keyframes checkmark {
  0% {
    opacity: 0;
    transform: rotate(45deg) scale(0.5);
  }
  100% {
    opacity: 1;
    transform: rotate(45deg) scale(1);
  }
}

.todo-item label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-size: 1.1rem;
  color: #246cda;
  transition: all 0.3s ease;
}

.todo-item label:hover {
  color: #ff8fab;
  transform: translateX(5px);
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