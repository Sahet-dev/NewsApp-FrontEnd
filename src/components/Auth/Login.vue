<template>
  <div>
    <transition
        name="fade"

    >
      <div
          v-if="notification.visible"
          class="notification"
      >
        {{ notification.message }}
      </div>
    </transition>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
          <div class="rounded-md shadow-sm">
            <div>
              <label for="username" class="sr-only">Username</label>
              <input
                  id="username"
                  name="username"
                  type="text"
                  autocomplete="username"
                  required
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  v-model="username"
              />
            </div>
            <div class="-mt-px">
              <label for="password" class="sr-only">Password</label>
              <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  v-model="password"
              />
            </div>
          </div>
          <div>
            <button
                type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </div>
          <p v-if="errorMessage" class="text-red-500 text-center">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </div>
</template>





<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import router from "../../../../news-nuxt/pages/router/index.js";
import { BASE_URL } from '@/stores/config.js';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const authStore = useAuthStore();
const notification = ref({ message: '', visible: false });


const handleSubmit = async () => {
  try {
    const response = await axios.post(
        `${BASE_URL}/login`,

        {
      username: username.value,
      password: password.value,
    });

    const { token, role } = response.data;
    showNotification('Lesson updated successfully!');
    authStore.login(token, role);
    await router.push('/');

  } catch (error) {
    errorMessage.value = 'Login failed. Please check your credentials and try again.';
    console.error(error);
  }
};

const showNotification = (message) => {
  notification.value.message = message;
  notification.value.visible = true;

  setTimeout(() => {
    notification.value.visible = false;
  }, 3000);
};

</script>

<style scoped>
.fade-enter-from{
  opacity: 0;
  transform: translateY(-60px);
}
.fade-enter-to{
  opacity: 1;
  transform: translateY(0);
}

.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-leave-from{
  opacity: 1;
  transform: translateY(0);
}
.fade-leave-to{
  opacity: 0;
  transform: translateY(-60px);
}
.fade-leave-active  {
  transition: all 0.3s ease;
}

.notification {
  position: fixed;
  top: 1rem; /* top-4 equivalent */
  right: 1rem; /* right-4 equivalent */
  background-color: #48bb78; /* bg-green-500 equivalent */
  color: white; /* text-white equivalent */
  padding: 0.75rem; /* p-3 equivalent */
  border-radius: 0.375rem;}
</style>
