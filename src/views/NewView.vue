<script setup lang="ts">
import { onMounted } from 'vue';
import { useBreadcrumbStore } from '@/store';
import AssetTable from '@/components/common/AssetTable/AssetTable.vue';
const { setBreadcrumbs } = useBreadcrumbStore();

const menus = [
  {
    name: 'Assets',
  },
];

onMounted(() => {
  setBreadcrumbs(menus);
});
</script>
<template>
  <AssetTable />
</template>
