import { useAuthStore } from '@/stores/authStore';

export const requireAdminOrEditor = (to, from, next) => {
    const authStore = useAuthStore();

    if (authStore.isLoggedIn && (authStore.role === 'ADMIN' || authStore.role === 'EDITOR')) {
        next();
    } else {
        next('/');
    }
};

export const requireAdmin = (to, from, next) => {
    const authStore = useAuthStore();

    if (authStore.isLoggedIn && authStore.role === 'ADMIN') {
        next();
    } else {
        next('/');
    }
};
