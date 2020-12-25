export const routes = [
    {
      store: {
        pageStore: './state/page-provider',
      },
    },
    {
      path: 'pages',
      name: 'Pages',
      component: './views/Pages.vue',
    },
    {
      path: 'pages/detail/:id?',
      name: 'PageDetail',
      component: './views/Detail.vue',
    }
  ];
  