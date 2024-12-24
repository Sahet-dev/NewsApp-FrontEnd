<template>
  <div v-if="articleStore.article" class="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
    <h2 class="text-3xl font-semibold text-gray-800 text-center mb-8">Update Article</h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Title -->
      <div class="form-group">
        <label for="title" class="block text-gray-700 font-medium">Title</label>
        <input
            id="title"
            type="text"
            v-model="form.title"
            placeholder="Enter article title"
            required
            class="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <!-- Content -->
      <div class="form-group">
        <label for="content" class="block text-gray-700 font-medium">Content</label>
        <textarea
            id="content"
            v-model="form.content"
            placeholder="Enter article content"
            rows="5"
            required
            class="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        ></textarea>
      </div>

      <!-- Image URL -->
      <div class="form-group">
        <label for="imageUrl" class="block text-gray-700 font-medium">Image URL</label>
        <input
            id="imageUrl"
            type="text"
            v-model="form.imageUrl"
            placeholder="Enter image URL"
            class="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <!-- Category -->
      <div class="form-group">
        <label for="categoryName" class="block text-gray-700 font-medium">Category</label>
        <input
            id="categoryName"
            type="text"
            v-model="form.categoryName"
            placeholder="Enter category name"
            required
            class="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <!-- Published At -->
      <div class="form-group">
        <label for="publishedAt" class="block text-gray-700 font-medium">Published At</label>
        <input
            id="publishedAt"
            type="datetime-local"
            v-model="form.publishedAt"
            class="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <!-- Submit Button -->
      <div class="form-group mt-6">
        <button
            type="submit"
            class="w-full py-3 bg-blue-600 text-white font-bold text-lg rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Article
        </button>
      </div>
    </form>

    <!-- Success or Error Message -->
    <p v-if="successMessage" class="mt-4 text-center text-green-600">{{ successMessage }}</p>
    <p v-if="errorMessage" class="mt-4 text-center text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useArticleStore } from '@/stores/articleStore';

const articleStore = useArticleStore();
const route = useRoute();

const form = ref({
  title: '',
  content: '',
  imageUrl: '',
  categoryName: '',
  publishedAt: null,
});

const successMessage = ref('');
const errorMessage = ref('');

onMounted(() => {
  articleStore.fetchArticle(route.params.id);
  watchArticle();
});

watch(() => route.params.id, () => {
  articleStore.fetchArticle(route.params.id);
  watchArticle();
});

const watchArticle = () => {
  watch(() => articleStore.article, (article) => {
    if (article) {
      form.value = {
        title: article.title,
        content: article.content,
        imageUrl: article.imageUrl,
        categoryName: article.category.name,
        publishedAt: article.publishedAt
            ? new Date(article.publishedAt).toISOString().slice(0, 16)
            : null, // Format for datetime-local
      };
    }
  }, { immediate: true });
};

const handleSubmit = async () => {
  try {
    await axios.put(`/api/news/${route.params.id}`, form.value);
    successMessage.value = 'Article updated successfully!';
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (error) {
    errorMessage.value = 'Failed to update article.';
    console.error(error);
    setTimeout(() => {
      errorMessage.value = '';
    }, 3000);
  }
};
</script>

<style scoped>
/* Additional custom styles can go here if needed */
</style>
