import { createRouter, createWebHistory } from 'vue-router';
import ArticleList from './../components/ArticleList.vue';
import ArticleDetail from './../components/ArticleDetail.vue';
import CreateArticle from './../components/CreateArticle.vue';

const routes = [
  { path: '/', component: ArticleList },
  { path: '/articles', component: ArticleList },
  { path: '/articles/:id', component: ArticleDetail },
  { path: '/articles/new', component: CreateArticle },
  { path: '/articles/:id/edit', component: CreateArticle },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
