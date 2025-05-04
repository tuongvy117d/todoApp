<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/utils/api';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
}

const users = ref<User[]>([]);
const isLoading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    const response = await api.get('/users');
    users.value = response.data.users;
    isLoading.value = false;
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load users';
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="admin-container">
    <h1>Admin Dashboard</h1>
    
    <div v-if="isLoading" class="loading">
      <p>Loading users data...</p>
    </div>
    
    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
    </div>
    
    <div v-else>
      <div class="admin-card">
        <h2>Users Management</h2>
        
        <table class="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span 
                  :class="['role-badge', user.role === 'admin' ? 'admin' : 'user']"
                >
                  {{ user.role }}
                </span>
              </td>
              <td>
                <span 
                  :class="['status-badge', user.isActive ? 'active' : 'inactive']"
                >
                  {{ user.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div v-if="users.length === 0" class="no-data">
          <p>No users found</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  margin-bottom: 2rem;
  color: #2c3e50;
}

.loading, .no-data {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}

.error-message {
  color: #842029;
  background-color: #f8d7da;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.admin-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
}

h2 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
  font-size: 1.5rem;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th, .users-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.users-table th {
  font-weight: 600;
  color: #2c3e50;
  background-color: #f8f9fa;
}

.role-badge, .status-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 600;
}

.role-badge.admin {
  background-color: #cff4fc;
  color: #055160;
}

.role-badge.user {
  background-color: #e2e3e5;
  color: #41464b;
}

.status-badge.active {
  background-color: #d1e7dd;
  color: #0f5132;
}

.status-badge.inactive {
  background-color: #f8d7da;
  color: #842029;
}

@media (max-width: 768px) {
  .users-table {
    display: block;
    overflow-x: auto;
  }
}
</style> 