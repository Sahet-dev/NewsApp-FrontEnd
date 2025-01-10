<template>
  <div class="admin-dashboard">
    <h1>Admin Dashboard</h1>

    <!-- Navigation links -->
    <nav>
      <ul>
        <li><router-link to="/articles">Article List</router-link></li>
        <li><router-link to="/articles/new">Create New Article</router-link></li>
        <li><router-link to="/user-articles">User Articles</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/register">Registration</router-link></li>
      </ul>
    </nav>

    <!-- Main content section -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'AdminPage',
};
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav li {
  margin: 10px 0;
}

nav a {
  text-decoration: none;
  color: #007bff;
}

nav a:hover {
  text-decoration: underline;
}
</style>
