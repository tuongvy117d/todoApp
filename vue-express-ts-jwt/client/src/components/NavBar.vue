<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const isLoggedIn = computed(() => authStore.isAuthenticated);
const isAdmin = computed(() => authStore.user?.role === 'admin');
const username = computed(() => authStore.user?.username || '');

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<template>
  <nav class="navbar">
    <div class="brand">
      <router-link to="/">Vue Express JWT</router-link>
    </div>
    <div class="nav-links">
      <router-link to="/">Home</router-link>
      
      <template v-if="isLoggedIn">
        <router-link to="/profile">Profile</router-link>
        <router-link v-if="isAdmin" to="/admin">Admin</router-link>
        <span class="user-info">Welcome, {{ username }}</span>
        <button @click="handleLogout" class="logout-btn">Logout</button>
      </template>
      
      <template v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </template>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #2c3e50;
  color: white;
}

.brand a {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-links a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: white;
}

.user-info {
  margin-right: 10px;
  color: #4fc08d;
}

.logout-btn {
  background-color: transparent;
  border: 1px solid #e74c3c;
  color: #e74c3c;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background-color: #e74c3c;
  color: white;
}
</style> 