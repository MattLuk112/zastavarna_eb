import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { dynamicRoutes, modifyIndex } from 'vue-routes-loader-admin';

import { routerFunctions } from 'vue-router-functions-admin';

import Index from './views/Index.vue';
import NotAllowed from './views/403.vue';
import NotFound from './views/404.vue';

const index: any = {
  path: __ADMIN_PATH__,
  name: 'AdminIndex',
  component: Index,
};

if (modifyIndex) {
  Object.keys(modifyIndex).forEach((key) => {
    index[key] = modifyIndex[key];
  });
}

index.children = [...dynamicRoutes];

const routes: RouteRecordRaw[] = [
  index,
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

routerFunctions.forEach((fn) => {
  Object.keys(fn).forEach((key) => {
    router[key]((to, from, next) => {
      fn[key](to, from, next);
    });
  });
});

export default router;
