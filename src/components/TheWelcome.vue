<template>
  <nav class="navbar">
    <div class="container">
      <router-link to="/" class="nav-logo">NewsApp</router-link>
      <ul class="nav-links">
        <li><router-link to="/articles">Articles</router-link></li>
        <li><router-link to="/articles/new">Create Article</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
// No specific script setup needed for this simple component
</script>

<style scoped>
.navbar {
  background-color: #007bff;
  padding: 1rem;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-logo {
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1rem;
}

.nav-links li {
  margin: 0;
}

.nav-links a {
  color: white;
  text-decoration: none;
}

.nav-links a:hover {
  text-decoration: underline;
}
</style>
