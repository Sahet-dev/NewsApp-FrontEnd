import {createRouter, createWebHistory} from "vue-router";
import {requireAdmin, requireAdminOrEditor} from "@/stores/guardRoutes.js";

const routes = [
  { path: '/', component: () => import('@/components/UserArticlePage.vue') },
  { path: '/articles', component: () => import('@/components/ArticleList.vue') },
  { path: '/login', component: () => import('@/components/Auth/Login.vue') },
  { path: '/register', component: () => import('@/components/Auth/Registration.vue') },
  { path: '/user-articles', component: () => import('@/components/UserArticlePage.vue') },
  { path: '/articles/:id', component: () => import('@/components/ArticleDetail.vue') },
  { path: '/articles/new', component: () => import('@/components/CreateArticle.vue'), beforeEnter: requireAdminOrEditor },
  { path: '/articles/:id/edit', component: () => import('@/components/UpdateArticle.vue'), props: (route) => ({ articleId: parseInt(route.params.id) }), beforeEnter: requireAdminOrEditor },
  { path: '/admin', component: () => import('@/components/AdminPage.vue'), beforeEnter: requireAdmin },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
