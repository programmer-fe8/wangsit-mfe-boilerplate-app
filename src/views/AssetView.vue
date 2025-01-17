<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';

import { BreadcrumbMenu } from 'wangsvue/components/breadcrumb/Breadcrumb.vue';
import { Button, ButtonFilter, ButtonSearch, Icon } from 'wangsvue';
import { useBreadcrumbStore } from '@/store';

import AssetForm from '@/components/modules/AssetTable/AssetForm.vue';
import AssetTable from '@/components/modules/AssetTable/AssetTable.vue';
import { Asset } from '@/types/asset.type';

const { setBreadcrumbs } = useBreadcrumbStore();

const menus: BreadcrumbMenu[] = [
  {
    name: 'Assets',
  },
];

const showForm = shallowRef(false);
const selectedAsset = shallowRef<Asset>();

onMounted(() => {
  setBreadcrumbs(menus);
});
</script>

<template>
  <div class="flex justify-end items-center">
    <ButtonSearch class="mr-5" />
    <ButtonFilter class="mr-6" />

    <Icon
      class="scale-[200%] mr-7"
      icon="file-history"
      info="Change Log"
      tooltip-pos="bottom"
    />
    <Button
      id="btn-dialog-form"
      @click="
        showForm = true;
        selectedAsset = undefined;
      "
      label="+ Register"
      severity="secondary"
    />
  </div>
  <AssetForm v-model:visible="showForm" :asset="selectedAsset" />
  <AssetTable
    @edit-asset="
      showForm = true;
      selectedAsset = $event;
    "
  />
</template>
