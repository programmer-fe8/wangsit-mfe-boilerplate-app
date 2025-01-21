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
        name: 'Exampleview',
        component: (): Promise<Component> => import('@/views/ExampleView.vue'),
      },
      {
        path: 'another-page',
        name: 'AnotherExampleview',
        component: (): Promise<Component> => import('@/views/ExampleView2.vue'),
      },
      {
        path: 'assets',
        name: 'AssetsView',
        component: (): Promise<Component> => import('@/views/AssetView.vue'),
      },
      {
        path: ':assetId/detail-assets',
        name: 'DetailAssetsview',
        component: (): Promise<Component> =>
          import('@/views/DetailAssetsView.vue'),
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
