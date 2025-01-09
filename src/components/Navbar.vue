<script setup>
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
};
</script>

<template>
  <nav class="navbar bg-white shadow-sm py-4">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-xl font-bold text-blue-600">NewsApp</router-link>
      <ul class="flex items-center space-x-6">
        <li><router-link to="/articles" class="text-gray-600 hover:text-blue-600">Articles</router-link></li>
        <li><router-link to="/articles/new" class="text-gray-600 hover:text-blue-600">Create Article</router-link></li>
        <template v-if="!authStore.isLoggedIn">
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
