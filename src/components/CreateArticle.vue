<template>
  <div class="news-article-form">
    <h2>{{ articleId ? 'Update Article' : 'Create New Article' }}</h2>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Title</label>
        <input
            id="title"
            type="text"
            v-model="form.title"
            placeholder="Enter article title"
            required
        />
      </div>

      <div class="form-group">
        <label for="content">Content</label>
        <textarea
            id="content"
            v-model="form.content"
            placeholder="Enter article content"
            rows="5"
            required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="imageUrl">Image URL</label>
        <input
            id="imageUrl"
            type="text"
            v-model="form.imageUrl"
            placeholder="Enter image URL"
        />
      </div>

      <div class="form-group">
        <label for="categoryName">Category</label>
        <input
            id="categoryName"
            type="text"
            v-model="form.categoryName"
            placeholder="Enter category name"
            required
        />
      </div>

      <div class="form-group">
        <label for="publishedAt">Published At</label>
        <input
            id="publishedAt"
            type="datetime-local"
            v-model="form.publishedAt"
        />
      </div>

      <button type="submit">
        {{ articleId ? 'Update Article' : 'Create Article' }}
      </button>
    </form>

    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Props
defineProps({
  articleId: {
    type: Number,
    default: null, // Null indicates creating a new article
  },
});

// State
const form = ref({
  title: '',
  content: '',
  imageUrl: '',
  categoryName: '',
  publishedAt: null,
});

const successMessage = ref('');
const errorMessage = ref('');
const router = useRouter();

// Watch for articleId changes (useful if this component is reused)
watch(
    () => articleId,
    (newId) => {
      if (newId) {
        fetchArticle(newId);
      } else {
        resetForm();
      }
    },
    { immediate: true }
);

// Fetch article data if updating
const fetchArticle = async (id) => {
  try {
    const { data } = await axios.get(`/api/articles/${id}`);
    form.value = {
      title: data.title,
      content: data.content,
      imageUrl: data.imageUrl,
      categoryName: data.category.name,
      publishedAt: data.publishedAt
          ? new Date(data.publishedAt).toISOString().slice(0, 16)
          : null, // Format for datetime-local
    };
  } catch (error) {
    errorMessage.value = 'Failed to fetch article data.';
    console.error(error);
  }
};

// Reset form when creating a new article
const resetForm = () => {
  form.value = {
    title: '',
    content: '',
    imageUrl: '',
    categoryName: '',
    publishedAt: null,
  };
};

// Submit handler
const handleSubmit = async () => {
  try {
    if (articleId) {
      // Update existing article
      await axios.put(`/api/articles/${articleId}`, form.value);
      successMessage.value = 'Article updated successfully!';
    } else {
      // Create new article
      await axios.post('/api/articles', form.value);
      successMessage.value = 'Article created successfully!';
      resetForm();
    }

    // Redirect or refresh (optional)
    setTimeout(() => {
      router.push('/articles'); // Adjust to your article list route
    }, 2000);
  } catch (error) {
    errorMessage.value = 'Failed to submit article.';
    console.error(error);
  }
};
</script>

<style scoped>
.news-article-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
}

h2 {
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.success-message {
  margin-top: 1rem;
  color: green;
  text-align: center;
}

.error-message {
  margin-top: 1rem;
  color: red;
  text-align: center;
}
</style>
