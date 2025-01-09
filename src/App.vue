<template>
  <div class="font-serif ">
    <!-- Render UserNavbar for non-ADMIN and non-EDITOR roles -->
    <UserNavbar v-if="!authStore.isLoggedIn || authStore.isLoggedIn && authStore.role !== 'ADMIN' || authStore.role !== 'EDITOR'" />

    <!-- Render Navbar for ADMIN and EDITOR roles -->
    <Navbar v-if="authStore.isLoggedIn && (authStore.role === 'ADMIN' || authStore.role === 'EDITOR')" />

    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import UserNavbar from "@/components/UserNavbar.vue";
import Navbar from "@/components/Navbar.vue";
import { useAuthStore } from '@/stores/authStore';
import { onMounted } from "vue";

const authStore = useAuthStore();

onMounted(() => {
  authStore.checkLoginStatus();
});
</script>
