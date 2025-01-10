<template>
  <nav class="navbar bg-white shadow-sm py-4 px-4">
    <div class="container mx-auto flex flex-wrap justify-between items-center">
      <!-- Logo -->
      <router-link
          to="/"
          class="text-xl font-bold text-blue-600"
      >
        NewsApp
      </router-link>

      <div class="text-green-500 font-bold">
        <router-link
            to="/articles"
            class="text-gray-600 hover:text-blue-600"
        >
          Articles list
        </router-link>
      </div>
    </div>
  </nav>
</template>
