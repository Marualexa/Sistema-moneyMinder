import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/moneyminder/', name: 'Home', component: () => import('../components/ImportApp.vue') },
        { path: '/newMovent', name: 'MotionRecord', component: () => import('../components/MotionRecord.vue') },
    ]
});

export default router