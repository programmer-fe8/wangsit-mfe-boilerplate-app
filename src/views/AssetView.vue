<script setup lang="ts">
import { onMounted } from 'vue';

import AssetTable from '@/components/modules/AssetTable/AssetTable.vue';
import AssetForm from '@/components/modules/AssetTable/AssetForm.vue';

import { useBreadcrumbStore } from '@/store';
import { BreadcrumbMenu } from 'wangsvue/components/breadcrumb/Breadcrumb.vue';
import { ButtonFilter, ButtonSearch, ButtonDownload } from 'wangsvue';

const { setBreadcrumbs } = useBreadcrumbStore();

const menus: BreadcrumbMenu[] = [
  {
    name: 'Assets',
  },
];

onMounted(() => {
  setBreadcrumbs(menus);
});
</script>

<template>
  <div class="flex justify-end items-center">
    <ButtonSearch class="mr-5" />
    <ButtonFilter class="mr-5" />
    <ButtonDownload class="mr-5" />
    <AssetForm />
  </div>
  <AssetTable />
</template>
