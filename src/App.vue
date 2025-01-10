<template>
  <div class="font-serif min-h-screen ">
    <UserNavbar
        v-if="!authStore.isLoggedIn || (authStore.isLoggedIn && authStore.role !== 'ADMIN' && authStore.role !== 'EDITOR')"
    />

    <Navbar
        v-if="authStore.isLoggedIn && (authStore.role === 'ADMIN' || authStore.role === 'EDITOR')"
    />


    <div class="flex-1">
      <RouterView />
    </div>
  </div>
</template>


<script setup>
import { RouterView } from 'vue-router';
import UserNavbar from "@/components/UserNavbar.vue";
import Navbar from "@/components/admin/Navbar.vue";
import { useAuthStore } from '@/stores/authStore';
import { onMounted } from "vue";

const authStore = useAuthStore();

onMounted(() => {
  authStore.checkLoginStatus();
});
</script>
