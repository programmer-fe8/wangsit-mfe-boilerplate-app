<script setup lang="ts">
/*
 * TODO: Ubah nama file ini jadi AssetView.vue, karena nama file harus deskriptif
 * Referensi: Coding Style Guide bagian 6.1.2
 */
import { onMounted } from 'vue';
import { ButtonFilter, ButtonSearch, ButtonDownload } from 'wangsvue';
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
    <ButtonDownload class="mr-5" />
    <RegisterForm />
  </div>
  <AssetTable />
</template>
