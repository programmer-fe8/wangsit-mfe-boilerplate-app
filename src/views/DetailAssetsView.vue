<script setup lang="ts">
import { onMounted } from 'vue';

import { BreadcrumbMenu } from 'wangsvue/components/breadcrumb/Breadcrumb.vue';
import { Image } from 'wangsvue';
import { useBreadcrumbStore } from '@/store';

const { setBreadcrumbs } = useBreadcrumbStore();
const imagePublicUrl =
  'https://images.unsplash.com/photo-1723556146809-2dcb7c1e0bf1?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const date = new Date();

const assetInfo = {
  brand: {
    label: 'Brand',
    value: 'Daihatsu',
  },
  model: {
    label: 'Model',
    value: 'Grand Max PU',
  },
  category: {
    label: 'Category',
    value: 'Kendaraan > Mobil > Mobil operasional',
  },
  group: {
    label: 'Group',
    value: 'Kacab 1 > Gedung A > Div Pengadaan',
  },
};

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

    <div class="flex flex-col ml-6">
      <h3 class="">General Information</h3>
      <div class="grid grid-cols-2">
        <div :key="asset.value" v-for="asset in assetInfo">
          <ul class="text-slate-600 mt-2 mr-10">
            {{
              asset.label
            }}
            <li class="text-base text-black">{{ asset.value }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
