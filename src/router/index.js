import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/moneyminder/', name: 'ImportApp', component: () => import('../components/ImportApp.vue') },
        { path: '/moneyminder/newMovent', name: 'MotionRecord', component: () => import('../components/MotionRecord.vue') },
        { path: '/moneyminder/history/:id', name: 'HistoryOfMovent', component: () => import('../components/Movement/HistoryOfMovements.vue') },
        { path: '/moneyminder/editMovent/:id', name: 'editMovement', component: () => import('../components/EditMovement.vue') },
        { path: '/moneyminder/login', name: 'login', component: () => import('../components/Registro/Login.vue') },
        { path: '/moneyminder/register', name: 'register', component: () => import('../components/Registro/Register.vue') },
    ],
});

export default router