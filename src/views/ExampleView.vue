<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';
import { useBreadcrumbStore } from '@/store';
import { BreadcrumbMenu } from 'wangsvue/components/breadcrumb/Breadcrumb.vue';

const { setBreadcrumbs } = useBreadcrumbStore();

const menus = shallowRef<BreadcrumbMenu[]>([
  {
    name: 'Home',
  },
  {
    name: 'Tab',
  },
]);

onMounted(() => {
  setBreadcrumbs(menus.value);
});
</script>
<template>
  <h1>Hello Word</h1>
</template>
