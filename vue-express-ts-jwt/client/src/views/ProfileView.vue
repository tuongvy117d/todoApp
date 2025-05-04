<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const isLoading = ref(true);
const errorMessage = ref('');

onMounted(async () => {
  try {
    await authStore.fetchCurrentUser();
    isLoading.value = false;
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to load profile data';
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="profile-container">
    <div v-if="isLoading" class="loading">
      <p>Loading profile data...</p>
    </div>
    
    <div v-else-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>
    
    <div v-else class="profile-card">
      <h1>Profile</h1>
      
      <div class="user-info">
        <div class="info-item">
          <span class="label">Username:</span>
          <span class="value">{{ authStore.user?.username }}</span>
        </div>
        
        <div class="info-item">
          <span class="label">Email:</span>
          <span class="value">{{ authStore.user?.email }}</span>
        </div>
        
        <div class="info-item">
          <span class="label">Role:</span>
          <span class="value">{{ authStore.user?.role }}</span>
        </div>
      </div>
      
      <div class="profile-actions">
        <h2>Account Actions</h2>
        <button @click="authStore.logout" class="btn btn-danger">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.loading, .error-message {
  text-align: center;
  padding: 2rem;
}

.error-message {
  color: #842029;
  background-color: #f8d7da;
  border-radius: 4px;
}

.profile-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.user-info {
  margin-bottom: 2rem;
}

.info-item {
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
}

.label {
  font-weight: 600;
  width: 100px;
  color: #6c757d;
}

.value {
  font-weight: 400;
  color: #2c3e50;
}

.profile-actions {
  margin-top: 2rem;
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

h2 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #bd2130;
}

@media (max-width: 576px) {
  .info-item {
    flex-direction: column;
  }
  
  .label {
    margin-bottom: 0.25rem;
  }
}
</style>