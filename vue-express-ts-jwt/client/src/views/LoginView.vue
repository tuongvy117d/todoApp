<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter, useRoute } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'Please enter email and password';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  try {
    const result = await authStore.login(email.value, password.value);
    
    if (result.success) {
      // Redirect to the original route if available or home
      const redirectPath = route.query.redirect as string || '/';
      router.push(redirectPath);
    } else {
      errorMessage.value = result.message || 'Login failed';
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'Login failed';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="login-container">
    <div class="login-form">
      <h1>Login</h1>
      
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            id="email"
            v-model="email"
            type="email" 
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            id="password"
            v-model="password"
            type="password" 
            placeholder="Enter your password"
            required
          />
        </div>
        
        <button 
          type="submit" 
          class="btn btn-primary"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
      
      <div class="login-footer">
        <p>Don't have an account? <router-link to="/register">Register</router-link></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);
  padding: 2rem;
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.login-form h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.btn {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #4fc08d;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #3daf7f;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  background-color: #f8d7da;
  color: #842029;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  text-align: center;
}

.login-footer {
  margin-top: 1.5rem;
  text-align: center;
  color: #666;
}

.login-footer a {
  color: #4fc08d;
  text-decoration: none;
}

.login-footer a:hover {
  text-decoration: underline;
}
</style> 