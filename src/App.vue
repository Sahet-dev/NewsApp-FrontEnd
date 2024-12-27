<script setup>
import {  RouterView } from 'vue-router'
import UserNavbar from "@/components/UserNavbar.vue";
</script>

<template>

  <div class="font-serif">
    <UserNavbar />
    <RouterView />
  </div>
</template>


