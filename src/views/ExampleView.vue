<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';
import { useBreadcrumbStore } from '@/store';
import { BreadcrumbMenu } from 'wangsvue/components/breadcrumb/Breadcrumb.vue.d';
import ExampleModule from '@/components/modules/ExampleModule/ExampleModule.vue';

const { setBreadcrumbs } = useBreadcrumbStore();

const menus = shallowRef<BreadcrumbMenu[]>([
  {
    name: 'Wangs',
  },
  {
    name: 'Home',
  },
]);

onMounted(() => {
  setBreadcrumbs(menus.value);
});
</script>
<template>
  <ExampleModule />
</template>
