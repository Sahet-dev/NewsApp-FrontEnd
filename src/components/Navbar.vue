<template>
  <nav class="navbar bg-white shadow-sm py-4">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <router-link to="/" class="text-xl font-bold text-blue-600">NewsApp</router-link>

      <!-- Navigation Links -->
      <ul class="flex items-center space-x-6">
        <li><router-link to="/articles" class="text-gray-600 hover:text-blue-600">Articles</router-link></li>
        <li><router-link to="/articles/new" class="text-gray-600 hover:text-blue-600">Create Article</router-link></li>

        <!-- Conditional Buttons -->
        <template v-if="!isLoggedIn">
          <li>
            <router-link
                to="/login"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Login
            </router-link>
          </li>
          <li>
            <router-link
                to="/register"
                class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
              Register
            </router-link>
          </li>
        </template>
        <template v-else>
          <li>
            <button
                @click="handleLogout"
                class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
              Logout
            </button>
          </li>
        </template>
      </ul>
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
