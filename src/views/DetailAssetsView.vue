<script setup lang="ts">
import { onMounted, computed, shallowRef } from 'vue';

import { useRoute } from 'vue-router';

import { Asset } from '@/types/asset.type';
import { BreadcrumbMenu } from 'wangsvue/components/breadcrumb/Breadcrumb.vue';
import { useBreadcrumbStore } from '@/store';
import { Image } from 'wangsvue';

import AssetServices from '@/services/assets.service';

onMounted(async () => {
  setBreadcrumbs(menus);
  await getAssetData();
});

const route = useRoute();

const { setBreadcrumbs } = useBreadcrumbStore();
const paramId = route.params.assetId;

const imagePublicUrl: string =
  'https://images.unsplash.com/photo-1723556146809-2dcb7c1e0bf1?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const menus: BreadcrumbMenu[] = [
  {
    name: 'Detail Assets',
  },
];

const assetInfo = shallowRef<Asset>();

const assetDetails = computed(() => {
  return {
    brand: {
      label: 'Brand',
      value: assetInfo.value?.brand,
    },
    model: {
      label: 'Model',
      value: assetInfo.value?.model,
    },
    category: {
      label: 'Category',
      value: assetInfo.value?.category,
    },
    group: {
      label: 'Group',
      value: assetInfo.value?.group,
    },
  };
});

const getAssetData = async (): Promise<void> => {
  try {
    const {
      data: {
        data: { data },
      },
    } = await AssetServices.getAssetsData({
      _id: paramId as string,
    });
    assetInfo.value = data[0];
  } catch (error) {
    console.error(error);
  }
};
</script>
<template v-if="assetInfo">
  <div class="flex justify-between">
    <h2 class="text-sm">{{ assetInfo?.name }}</h2>
    <div class="flex flex-col text-right">
      <p>Last Modified</p>
      <p class="mt-1">
        {{ assetInfo?.updatedAt }} by
        {{ assetInfo?.userFirstName ?? '....' }}
      </p>
    </div>
  </div>
  <div class="flex">
    <Image
      :src="assetInfo?.assetImage ?? imagePublicUrl"
      class="object-cover w-40 h-40"
    />
    <div class="flex flex-col ml-6">
      <h3 class="">General Information</h3>
      <div class="grid grid-cols-2">
        <ul
          :key="asset.value"
          v-for="asset in assetDetails"
          class="text-slate-600 mt-2 mr-10"
        >
          {{
            asset.label
          }}
          <li class="text-base text-black">
            {{ asset.value }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
