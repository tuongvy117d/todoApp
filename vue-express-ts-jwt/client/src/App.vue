<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';
import NavBar from './components/NavBar.vue';

const authStore = useAuthStore();

onMounted(async () => {
  // Check if user is authenticated on page load
  if (authStore.isAuthenticated) {
    try {
      await authStore.fetchCurrentUser();
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      // If token is invalid, logout user
      authStore.logout();
    }
  }
});
</script>

<template>
  <div class="app">
    <NavBar />
    <main class="content">
      <router-view />
    </main>
    <footer class="footer">
      <p>&copy; {{ new Date().getFullYear() }} Vue Express JWT Auth. All rights reserved.</p>
    </footer>
  </div>
</template>

<style>
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
  background-color: #fff5f7;
  color: #4a4a4a;
  line-height: 1.6;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(to bottom, #fff5f7, #ffe4e9);
}

.content {
  flex: 1;
  padding: 2rem;
}

.footer {
  text-align: center;
  padding: 1.5rem;
  background-color: #ff8fab;
  color: white;
  margin-top: 2rem;
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
  color: #ff4d6d;
}

a {
  color: #ff4d6d;
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: #ff8fab;
  text-decoration: none;
}

button {
  background-color: #ff4d6d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #ff8fab;
}
</style>
