import { defineStore } from 'pinia';
import axios from 'axios';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
  }),
  
  actions: {
    async register(username: string, email: string, password: string) {
      try {
        const response = await axios.post('http://localhost:5123/api/auth/register', {
          username,
          email,
          password,
        });
        
        const { user, token } = response.data;
        
        this.user = user;
        this.token = token;
        this.isAuthenticated = true;
        
        localStorage.setItem('token', token);
        
        return { success: true };
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Registration failed',
        };
      }
    },
    
    async login(email: string, password: string) {
      try {
        const response = await axios.post('http://localhost:5123/api/auth/login', {
          email,
          password,
        });
        
        const { user, token } = response.data;
        
        this.user = user;
        this.token = token;
        this.isAuthenticated = true;
        
        localStorage.setItem('token', token);
        
        return { success: true };
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Invalid credentials',
        };
      }
    },
    
    async fetchCurrentUser() {
      try {
        const response = await axios.get('http://localhost:5123/api/auth/me', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        
        this.user = response.data.user;
        return { success: true };
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch user data',
        };
      }
    },
    
    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
}); 