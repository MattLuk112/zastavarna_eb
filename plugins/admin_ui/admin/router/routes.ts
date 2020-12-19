export const routes = [
  {
    path: '',
    component: './theme/Index.vue',
    redirect: {
      name: 'Contracts',
    },
  },
  {
    path: 'preview',
    component: './theme/Preview.vue'
  }
];
