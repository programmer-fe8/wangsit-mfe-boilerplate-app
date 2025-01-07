<script setup lang="ts">
import { onMounted } from 'vue';
import { ButtonFilter, ButtonSearch } from 'wangsvue';
import { useBreadcrumbStore } from '@/store';
import AssetTable from '@/components/common/AssetTable/AssetTable.vue';
import RegisterForm from '@/components/common/RegisterForm/RegisterForm.vue';
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
  <div class="flex justify-end items-center">
    <ButtonSearch class="mr-5" />
    <ButtonFilter class="mr-5" />
    <RegisterForm />
  </div>
  <AssetTable />
</template>
