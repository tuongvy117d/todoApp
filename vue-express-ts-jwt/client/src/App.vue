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
  background-color: #f5f5f5;
  color: #333;
  line-height: 1.6;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}

.footer {
  text-align: center;
  padding: 1.5rem;
  background-color: #2c3e50;
  color: white;
  margin-top: 2rem;
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
}

a {
  color: #4fc08d;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
