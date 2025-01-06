<script setup lang="ts">
import { ref } from 'vue';
import { useBreadcrumbStore } from '@/store';
import { Breadcrumb, Card, TabMenu } from 'wangsvue';
import { MenuItem } from 'wangsvue/components/menuitem';

const { breadcrumbs } = useBreadcrumbStore();
</script>

<template>
  <Breadcrumb :menus="breadcrumbs" />
  <Card>
    <template #content>
      <router-view />
    </template>
  </Card>
</template>
