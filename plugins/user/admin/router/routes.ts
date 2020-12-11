export const routes = [
  {
    meta: {
      role: 300,
    },
  },
  {
    path: 'users',
    name: 'Users',
    component: './views/Users.vue',
    meta: {
      role: 700,
      title: 'Uživatelé',
    },
  },
];
