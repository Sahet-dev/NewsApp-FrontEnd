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
import UserNavbar from "../../news-nuxt/pages/articles/UserNavbar.vue";
import Navbar from "../../news-nuxt/pages/admin/Navbar.vue";
import { useAuthStore } from '@/stores/authStore';
import { onMounted } from "vue";

const authStore = useAuthStore();


function loadAdSenseScript() {
  if (!document.querySelector('script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) {
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1638187422634927";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    script.onload = () => {
      console.log('Google AdSense script loaded successfully.');
    };

    script.onerror = () => {
      console.error('Failed to load the Google AdSense script.');
    };
  }
}



onMounted(() => {
  authStore.checkLoginStatus();
  loadAdSenseScript();
});
</script>
