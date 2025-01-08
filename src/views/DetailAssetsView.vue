<script setup lang="ts">
import { onMounted } from 'vue';

/*
 * TODO: Import dulu, baru const
 * Referensi: Coding Style Guide bagian 5.1.2
 */
import { useBreadcrumbStore } from '@/store';
import { Image } from 'wangsvue';
import { BreadcrumbMenu } from 'wangsvue/components/breadcrumb/Breadcrumb.vue';

const { setBreadcrumbs } = useBreadcrumbStore();

const imagePublicUrl =
  'https://images.unsplash.com/photo-1723556146809-2dcb7c1e0bf1?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const date = new Date();

// TODO: Tambah type BreadcrumbMenu[]
const menus: BreadcrumbMenu[] = [
  {
    name: 'Detail Assets',
  },
];

onMounted(() => {
  setBreadcrumbs(menus);
});
</script>
<template>
  <div class="flex justify-between">
    <h2 class="text-sm">Detail Assets</h2>
    <p>{{ date }}</p>
  </div>
  <div class="flex mt-5">
    <Image :src="imagePublicUrl" class="object-cover w-40 h-40" />
  </div>
</template>
