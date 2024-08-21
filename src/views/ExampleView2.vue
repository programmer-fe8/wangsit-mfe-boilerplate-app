<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';
import { useBreadcrumbStore } from '@/store';

const { setBreadcrumbs } = useBreadcrumbStore();

const menus = shallowRef([
  {
    name: 'Wangs',
  },
  {
    name: 'Another Page',
  },
]);

onMounted(() => {
  setBreadcrumbs(menus.value);
});
</script>
<template>
  <h1>Hello from Another Tab</h1>
</template>
