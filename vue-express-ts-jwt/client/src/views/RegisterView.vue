<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const handleRegister = async () => {
  // Form validation
  if (!username.value || !email.value || !password.value) {
    errorMessage.value = 'Please fill in all fields';
    return;
  }

  if (password.value.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters long';
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  try {
    const result = await authStore.register(
      username.value, 
      email.value, 
      password.value
    );
    
    if (result.success) {
      router.push('/');
    } else {
      errorMessage.value = result.message || 'Registration failed';
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'Registration failed';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="register-container">
    <div class="register-form">
      <h1>Register</h1>
      
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            id="username"
            v-model="username"
            type="text" 
            placeholder="Enter your username"
            required
          />
        </div>
        
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
            minlength="6"
          />
        </div>
        
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input 
            id="confirmPassword"
            v-model="confirmPassword"
            type="password" 
            placeholder="Confirm your password"
            required
          />
        </div>
        
        <button 
          type="submit" 
          class="btn btn-primary"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Registering...' : 'Register' }}
        </button>
      </form>
      
      <div class="register-footer">
        <p>Already have an account? <router-link to="/login">Login</router-link></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);
  padding: 2rem;
}

.register-form {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.register-form h1 {
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

.register-footer {
  margin-top: 1.5rem;
  text-align: center;
  color: #666;
}

.register-footer a {
  color: #4fc08d;
  text-decoration: none;
}

.register-footer a:hover {
  text-decoration: underline;
}
</style> 