<template>
  <nav class="navbar bg-white shadow-sm py-4">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <router-link to="/" class="text-xl font-bold text-blue-600">NewsApp</router-link>


    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Reactive state to track user login
const isLoggedIn = ref(false);

// Check token in localStorage
onMounted(() => {
  const token = localStorage.getItem('authToken');
  isLoggedIn.value = !!token; // Set to true if token exists
});

// Logout handler
const handleLogout = () => {
  localStorage.removeItem('authToken');
  isLoggedIn.value = false;
};
</script>

<style scoped>
.navbar {
  background-color: #f8fafc; /* Light Gray Background */
  padding: 1rem 0;
}
.nav-links a {
  text-decoration: none;
  color: #374151; /* Dark Gray */
  font-weight: 500;
  padding: 0.5rem;
}
.nav-links a:hover {
  color: #2563eb; /* Blue */
}
</style>
