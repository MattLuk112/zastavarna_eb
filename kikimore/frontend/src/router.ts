import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { dynamicRoutes } from 'vue-routes-loader-frontend';

import Index from './views/Index.vue';
import NotAllowed from './views/403.vue';
import NotFound from './views/404.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    children: dynamicRoutes,
  },
  {
    path: '/403',
    name: '403',
    component: NotAllowed,
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
