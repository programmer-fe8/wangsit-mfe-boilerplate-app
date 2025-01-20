<script setup lang="ts">
import { onMounted } from 'vue';

import { BreadcrumbMenu } from 'wangsvue/components/breadcrumb/Breadcrumb.vue';
import { useBreadcrumbStore } from '@/store';

import AssetTable from '@/components/modules/AssetTable/AssetTable.vue';

onMounted(() => {
  setBreadcrumbs(menus);
});

const { setBreadcrumbs } = useBreadcrumbStore();

const menus: BreadcrumbMenu[] = [
  {
    name: 'Assets',
  },
];
</script>

<template>
  <AssetTable />
</template>
