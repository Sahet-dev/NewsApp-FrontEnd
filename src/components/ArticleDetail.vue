<template>
  <div v-if="article" class="article-detail">
    <h2>{{ article.title }}</h2>
    <p><strong>Category:</strong> {{ article.category.name }}</p>
    <p>{{ article.content }}</p>
    <p><strong>Published At:</strong> {{ new Date(article.publishedAt).toLocaleString() }}</p>
    <img :src="article.imageUrl" alt="Article Image" />
    <router-link :to="`/articles/${article.id}/edit`">Edit</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

// State
const article = ref(null);
const route = useRoute();

// Fetch article details
const fetchArticle = async () => {
  try {
    const { data } = await axios.get(`http://localhost:8080/api/news/${route.params.id}`);
    article.value = data;
  } catch (error) {
    console.error('Failed to fetch article:', error);
  }
};

onMounted(() => {
  fetchArticle();
});
</script>

<style scoped>
/* Add your styles here */
</style>
