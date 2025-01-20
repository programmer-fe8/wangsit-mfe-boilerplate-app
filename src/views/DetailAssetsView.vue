<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { Asset } from '@/types/asset.type';
import { BreadcrumbMenu } from 'wangsvue/components/breadcrumb/Breadcrumb.vue';
import { useBreadcrumbStore } from '@/store';
import { Image } from 'wangsvue';

import AssetServices from '@/services/assets.service';

/*
 * TODO: Perhatiin lagi urutannya, onMounted dimana, router dimana, dll
 * Referensi: Coding Guide bagian 5.1
 */

const { setBreadcrumbs } = useBreadcrumbStore();
const imagePublicUrl: string =
  'https://images.unsplash.com/photo-1723556146809-2dcb7c1e0bf1?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const route = useRoute();
const paramId = route.params.assetId;

const menus: BreadcrumbMenu[] = [
  {
    name: 'Detail Assets',
  },
];

// TODO: Pake shallowRef, karena properti dalam objek gak bakal diubah
const assetInfo = ref<Asset>();

onMounted(async () => {
  setBreadcrumbs(menus);
  // TODO: Jangan define function dalam onMounted
  const getAssetData = async (): Promise<void> => {
    try {
      const {
        data: {
          data: { data },
        },
      } = await AssetServices.getAssetsData({
        _id: `${JSON.stringify([paramId])}`,
      });
      assetInfo.value = data[0];
    } catch (error) {
      console.error(error);
    }
  };
  await getAssetData();
});
</script>
<template>
  <!-- TODO: Tambahin template v-if="assetInfo", jadi cuma ditampilin kalau udah dapet data -->
  <div class="flex justify-between">
    <h2 class="text-sm">{{ assetInfo?.name }}</h2>
    <div class="flex flex-col text-right">
      <p>Last Modified</p>
      <p class="mt-1">
        {{ assetInfo?.updatedAt }} by
        <!-- TODO: Ubah yang di bawah ini jadi pake Nullish Coalescing Operator (coba cari cara pakenya) -->
        {{ assetInfo?.userFirstName ? assetInfo?.userFirstName : '.....' }}
      </p>
    </div>
  </div>
  <div class="flex">
    <!-- TODO: Yang di bawah ini bakal selalu jadi imagePublicUrl,
     ubah jadi Nullish Coalescing Operator. Yang kayak gini
     (salah satu value bisa undefined) selalu pake nullish
     operator, jangan pake or. -->
    <Image
      :src="imagePublicUrl || assetInfo?.assetImage"
      class="object-cover w-40 h-40"
    />
    <div class="flex flex-col ml-6">
      <h3 class="">General Information</h3>
      <div class="grid grid-cols-2">
        <!-- TODO: Pake v-for, kayak sebelumnya -->
        <ul class="text-slate-600 mt-2 mr-10">
          Brand
          <li class="text-base text-black">{{ assetInfo?.brand }}</li>
        </ul>
        <ul class="text-slate-600 mt-2 mr-10">
          Model/Type
          <li class="text-base text-black">{{ assetInfo?.model }}</li>
        </ul>
        <ul class="text-slate-600 mt-2 mr-10">
          Category
          <li class="text-base text-black">{{ assetInfo?.category }}</li>
        </ul>
        <ul class="text-slate-600 mt-2 mr-10">
          Group
          <li class="text-base text-black">{{ assetInfo?.group }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
