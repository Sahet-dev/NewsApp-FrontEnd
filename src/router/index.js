import { createRouter, createWebHistory } from 'vue-router';
import ArticleList from './../components/ArticleList.vue';
import ArticleDetail from './../components/ArticleDetail.vue';
import CreateArticle from './../components/CreateArticle.vue';
import UpdateArticle from "@/components/UpdateArticle.vue";
import UserArticlePage from "@/components/UserArticlePage.vue";
import Login from "@/components/Auth/Login.vue";
import Registration from "@/components/Auth/Registration.vue";

const routes = [
  { path: '/', component: UserArticlePage },
  { path: '/articles', component: ArticleList },
  { path: '/login', component: Login },
  { path: '/register', component: Registration },
  { path: '/user-articles', component: UserArticlePage },
  { path: '/articles/:id', component: ArticleDetail },
  { path: '/articles/new', component: CreateArticle },
  { path: '/articles/:id/edit', component: UpdateArticle, props: (route) => ({ articleId: parseInt(route.params.id) }), },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
