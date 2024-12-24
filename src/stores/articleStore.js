import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useArticleStore = defineStore('articleStore', () => {
    const articles = ref([]); // Reactive state for articles
    const article = ref(null); // Reactive state for a single article

    // Fetch all articles
    const fetchArticles = async () => {
        if (articles.value.length > 0) return; // Avoid re-fetching
        try {
            const { data } = await axios.get('http://localhost:8080/api/news/all');
            articles.value = data;
        } catch (error) {
            console.error('Failed to fetch articles:', error);
        }
    };

    // Fetch a single article
    const fetchArticle = async (id) => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/news/${id}`);
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
