<script setup>
import {ref, computed, onMounted} from 'vue';
import { useArticleStore } from '@/stores/articleStore';

const articles = useArticleStore();

const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

onMounted(() => {
  articles.fetchArticles();
});

const trendingArticles = computed(() => {
  return articles.articles && articles.articles.length > 0 ? articles.articles.slice(0, 3) : [];
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Trending Topics -->
    <div class="max-w-7xl mx-auto px-6 pt-12 pb-8">
      <h2 class="text-3xl font-bold text-gray-900 tracking-tight mb-6">Trending Topics</h2>
      <div class="flex flex-wrap gap-3">
        <span class="bg-white text-gray-700 py-2 px-4 rounded-full cursor-pointer border border-gray-200 shadow-sm transition-all hover:bg-blue-600 hover:text-white hover:border-transparent">Technology</span>
        <span class="bg-white text-gray-700 py-2 px-4 rounded-full cursor-pointer border border-gray-200 shadow-sm transition-all hover:bg-blue-600 hover:text-white hover:border-transparent">Health</span>
        <span class="bg-white text-gray-700 py-2 px-4 rounded-full cursor-pointer border border-gray-200 shadow-sm transition-all hover:bg-blue-600 hover:text-white hover:border-transparent">Entertainment</span>
      </div>
    </div>

    <!-- News Section -->
    <div v-if="trendingArticles.length > 0" class="max-w-7xl mx-auto px-6 py-12 bg-white shadow-sm rounded-xl">
      <div class="space-y-12">
        <div
            v-for="article in trendingArticles"
            :key="article.id"
            class="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl"
        >
          <div class="grid md:grid-cols-2 gap-8">
            <div class="order-2 md:order-1 p-8">
              <span class="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
                {{ article.category.name }}
              </span>
              <h3 class="mt-4 text-2xl font-bold text-gray-900 leading-tight">
                {{ article.title }}
              </h3>
              <p class="mt-4 text-gray-600 leading-relaxed line-clamp-3">
                {{ article.content }}
              </p>
              <div class="mt-6 text-sm text-gray-500 font-medium">
                {{ formatDate(article.publishedAt) }}
              </div>
            </div>
            <div class="order-1 md:order-2">
              <img
                  :src="article.imageUrl"
                  :alt="article.title"
                  class="w-full h-64 md:h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Editor's Pick -->
    <div class="max-w-7xl mx-auto px-6 py-12">
      <h2 class="text-3xl font-bold text-gray-900 tracking-tight mb-8">Editor's Pick</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
            v-for="article in trendingArticles"
            :key="article.id"
            class="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl"
        >
          <div class="aspect-w-16 aspect-h-9">
            <img :src="article.imageUrl" :alt="article.title" class="w-full h-48 object-cover" />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{{ article.title }}</h3>
            <p class="text-gray-600 line-clamp-3 leading-relaxed">{{ article.content }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Popular Articles -->
    <div class="max-w-7xl mx-auto px-6 py-12">
      <h2 class="text-3xl font-bold text-gray-900 tracking-tight mb-8">Popular Articles</h2>
      <div class="space-y-6">
        <div
            v-for="article in trendingArticles"
            :key="article.id"
            class="flex items-center space-x-6 bg-white p-4 rounded-xl shadow-sm transition-all duration-300 hover:shadow-xl"
        >
          <img :src="article.imageUrl" :alt="article.title" class="w-20 h-20 object-cover rounded-lg" />
          <div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ article.title }}</h3>
            <p class="text-gray-600 line-clamp-2 leading-relaxed">{{ article.content }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Newsletter Subscription -->
    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl">
        <div class="px-8 py-12 text-center">
          <!-- Heading -->
          <h2 class="text-4xl font-bold  mb-6 leading-tight">
            Subscribe to our Newsletter
          </h2>

          <!-- Subheading -->
          <p class="text-blue-100 mb-10 max-w-lg mx-auto text-lg leading-relaxed">
            Stay up-to-date with the latest news, updates, and offers delivered straight to your inbox.
          </p>

          <!-- Subscription Form -->
          <form class="flex flex-col sm:flex-row gap-6 max-w-md mx-auto">
            <!-- Email Input -->
            <input
                type="email"
                class="flex-1 px-6 py-4 rounded-lg bg-white/90 border-0 focus:ring-2 focus:ring-white focus:outline-none"
                placeholder="Enter your email"
            />

            <!-- Subscribe Button -->
            <button
                type="submit"
                class="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg transition-all duration-300 hover:bg-blue-50 focus:outline-none"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>
