<script setup>
import { ref, computed, onMounted } from 'vue';
import { useArticleStore } from '@/stores/articleStore';

const articles = useArticleStore();

// Format the `publishedAt` date
const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Fetch articles on component mount
onMounted(() => {
  articles.fetchArticles();
});

// Track selected category
const selectedCategory = ref('All');

// Get unique categories from articles
const categories = computed(() => {
  const uniqueCategories = new Set(articles.articles.map((article) => article.categoryName));
  return ['All', ...uniqueCategories]; // Add "All" for showing all articles
});

// Filter articles based on the selected category
const filteredArticles = computed(() => {
  if (selectedCategory.value === 'All') {
    return articles.articles;
  }
  return articles.articles.filter((article) => article.categoryName === selectedCategory.value);
});
</script>
<template>
  <div class="min-h-screen bg-gray-50 font-serif">
    <!-- Category Buttons -->
    <div class="flex overflow-x-auto space-x-4 py-6 px-4">
      <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="[
          'whitespace-nowrap px-4 py-2 rounded-lg font-semibold',
          selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        ]"
      >
        {{ category }}
      </button>
    </div>

    <!-- News Section -->
    <div
        v-if="filteredArticles.length > 0"
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white shadow-sm rounded-xl"
    >
      <div class="space-y-12">
        <div
            v-for="article in filteredArticles"
            :key="article.id"
            class="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl"
        >
          <router-link :to="`/articles/${article.id}`" class="block p-4 sm:p-6">
            <div class="grid md:grid-cols-2 gap-4 md:gap-8">
              <!-- Text Section -->
              <div class="order-2 md:order-1 p-4 sm:p-8">
                <span class="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
                  {{ article.categoryName }}
                </span>
                <h3 class="mt-4 text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                  {{ article.title }}
                </h3>
                <div class="mt-6 text-sm text-gray-500 font-medium">
                  {{ formatDate(article.publishedAt) }}
                </div>
              </div>

              <!-- Image Section -->
              <div class="order-1 md:order-2">
                <img
                    src="/default.jpg"
                    :alt="article.title"
                    class="w-full h-40 sm:h-64 md:h-full object-cover"
                />
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- No Articles Message -->
    <div v-else class="text-center text-gray-500 py-12">
      No articles found for the selected category.
    </div>
  </div>
</template>

