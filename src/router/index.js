import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/moneyminder/', name: 'ImportApp', component: () => import('../components/ImportApp.vue') },
        { path: '/moneyminder/newMovent', name: 'MotionRecord', component: () => import('../components/MotionRecord.vue') },
        { path: '/moneyminder/history/:id', name: 'HistoryOfMovent', component: () => import('../components/Movement/HistoryOfMovements.vue') },
    ],
});

export default router