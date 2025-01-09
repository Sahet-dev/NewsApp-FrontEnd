import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from "@/stores/apiClient.js";

export const useArticleStore = defineStore('articleStore', () => {
    const articles = ref([]);
    const article = ref(null);

    const fetchArticles = async () => {
        if (articles.value.length > 0) return; // Avoid re-fetching
        try {
            const { data } = await apiClient.get('/api/news/all');
            articles.value = data;
        } catch (error) {
            console.error('Failed to fetch articles:', error);
        }
    };

    const fetchArticle = async (id) => {
        try {
            const { data } = await apiClient.get(`/api/news/${id}`);
            article.value = data;
        } catch (error) {
            console.error('Failed to fetch article:', error);
        }
    };

    return {
        articles,
        article,
        fetchArticles,
        fetchArticle,
    };
});
