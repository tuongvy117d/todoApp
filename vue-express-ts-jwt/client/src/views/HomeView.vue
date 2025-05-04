<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';

const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isAuthenticated);
const username = computed(() => authStore.user?.username || 'Guest');
</script>

<template>
  <div class="home-container">
    <div class="hero-section">
      <h1>Welcome to Vue Express JWT Auth</h1>
      <p class="subtitle">A full-stack TypeScript application with JWT authentication</p>
      
      <div v-if="isLoggedIn" class="welcome-box">
        <h2>Hello, {{ username }}!</h2>
        <p>You are successfully logged in.</p>
        <router-link to="/profile" class="btn btn-primary">Go to Profile</router-link>
      </div>
      
      <div v-else class="auth-buttons">
        <router-link to="/login" class="btn btn-primary">Login</router-link>
        <router-link to="/register" class="btn btn-secondary">Register</router-link>
      </div>
    </div>
    
    <div class="features-section">
      <h2>Features</h2>
      
      <div class="feature-grid">
        <div class="feature-card">
          <h3>Vue 3 + TypeScript</h3>
          <p>Modern frontend with composition API and type safety</p>
        </div>
        
        <div class="feature-card">
          <h3>Express + TypeScript</h3>
          <p>Robust backend API with strong typing</p>
        </div>
        
        <div class="feature-card">
          <h3>JWT Authentication</h3>
          <p>Secure authentication with JSON Web Tokens</p>
        </div>
        
        <div class="feature-card">
          <h3>MongoDB</h3>
          <p>Flexible NoSQL database storage</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  text-align: center;
  margin-bottom: 4rem;
  padding: 3rem 1rem;
  border-radius: 8px;
  background-color: #f8f9fa;
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.25rem;
  color: #6c757d;
  margin-bottom: 2.5rem;
}

.welcome-box {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #e9f7ef;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.welcome-box h2 {
  color: #4fc08d;
  margin-bottom: 1rem;
}

.auth-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #4fc08d;
  color: white;
}

.btn-primary:hover {
  background-color: #3daf7f;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.features-section {
  margin-top: 3rem;
}

.features-section h2 {
  text-align: center;
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #eee;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  color: #4fc08d;
  margin-bottom: 0.75rem;
}

.feature-card p {
  color: #6c757d;
}

@media (max-width: 768px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
  
  .home-container {
    padding: 1rem;
  }
  
  .hero-section {
    padding: 2rem 1rem;
  }
  
  h1 {
    font-size: 2rem;
  }
}
</style> 