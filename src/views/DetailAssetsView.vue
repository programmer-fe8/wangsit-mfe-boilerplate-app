<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { BreadcrumbMenu } from 'wangsvue/components/breadcrumb/Breadcrumb.vue';
import { Image } from 'wangsvue';
import { useBreadcrumbStore } from '@/store';
import { Asset } from '@/types/asset.type';

import AssetServices from '@/services/assets.service';

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

const assetInfo = ref<Asset>();

onMounted(async () => {
  setBreadcrumbs(menus);
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
  <div class="flex justify-between">
    <h2 class="text-sm">{{ assetInfo?.name }}</h2>
    <div class="flex flex-col text-right">
      <p>Last Modified</p>
      <p class="mt-1">
        {{ assetInfo?.updatedAt }} by
        {{ assetInfo?.userFirstName ? assetInfo?.userFirstName : '.....' }}
      </p>
    </div>
  </div>
  <div class="flex">
    <Image
      :src="imagePublicUrl || assetInfo?.assetImage"
      class="object-cover w-40 h-40"
    />
    <div class="flex flex-col ml-6">
      <h3 class="">General Information</h3>
      <div class="grid grid-cols-2">
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
