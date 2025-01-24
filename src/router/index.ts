import { Component } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: (): Promise<Component> => import('@/layout/ExampleLayout.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'ExampleView',
        component: (): Promise<Component> => import('@/views/ExampleView.vue'),
      },
      {
        path: 'another-page',
        name: 'AnotherExampleView',
        component: (): Promise<Component> => import('@/views/ExampleView2.vue'),
      },
      {
        path: 'assets',
        name: 'Assetsview',
        component: (): Promise<Component> => import('@/views/AssetView.vue'),
      },
      {
        path: ':assetId/detail-assets',
        name: 'DetailAssetsview',
        component: (): Promise<Component> =>
          import('@/views/DetailAssetsView.vue'),
      },
      {
        path: 'customfield',
        name: 'CustomFieldview',
        redirect: '/customfield/global',
        component: (): Promise<Component> =>
          import('@/views/CustomFieldView.vue'),
        children: [
          {
            path: ':type(global|specific)',
            name: 'CustomFieldSpecificview',
            component: (): Promise<Component> =>
              import('@/components/modules/CustomField/CustomFieldTable.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/',
    component: (): Promise<Component> => import('@/layout/BlankLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'LoginView',
        component: (): Promise<Component> => import('@/views/LoginView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory((import.meta.env || process.env).BASE_URL),
  routes,
});

export default router;
