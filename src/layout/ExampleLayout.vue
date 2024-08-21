<script setup lang="ts">
import { ref } from 'vue';
import { useBreadcrumbStore } from '@/store';
import { Breadcrumb, Card, TabMenu } from 'wangsvue';
import { MenuItem } from 'wangsvue/components/menuitem';

const { breadcrumbs } = useBreadcrumbStore();

const tabMenus = ref<MenuItem[]>([
  {
    label: 'Home',
    route: 'home',
  },
  {
    label: 'Another Page',
    route: 'another-page',
  },
]);
</script>

<template>
  <Breadcrumb :menus="breadcrumbs" />
  <Card>
    <template #content>
      <TabMenu :menu="tabMenus" />
      <router-view />
    </template>
  </Card>
</template>
