<template>
  <div class="article-list">
    <h2>News Articles</h2>
    <ul>
      <li v-for="article in articles" :key="article.id">
        <router-link :to="`/articles/${article.id}`">{{ article.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// State
const articles = ref([]);

// Fetch articles
const fetchArticles = async () => {
  try {
    const { data } = await axios.get('http://localhost:8080/api/news/all');
    articles.value = data;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
  }
};

onMounted(() => {
  fetchArticles();
});
</script>

<style scoped>
/* Add your styles here */
</style>
