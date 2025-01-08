<script setup lang="ts">
/*
 * TODO: Named import dulu, baru default import
 * Referensi: Coding Style Guide bagian 5.1.2
 */
import { computed, shallowRef } from 'vue';

import response from './data/response.json';

import { DataTable } from 'wangsvue';
import { TableColumn } from 'wangsvue/components/datatable/DataTable.vue';
import { Asset } from '@/types/asset.type';
import { MenuItem } from 'wangsvue/components/menuitem';

/*
 * TODO: Perhatiin urutannya, harusnya constant dulu, baru shallowRef, baru computed
 * Referensi: Coding Style Guide bagian 5.1.2
 */

const tableColumns: TableColumn[] = [
  {
    header: 'Assets',
    fixed: true,
    field: 'asset',
    sortable: true,
  },
  {
    header: 'Group',
    fixed: true,
    field: 'group',
    sortable: true,
  },
  {
    header: 'Category',
    fixed: true,
    field: 'category',
    sortable: true,
  },
  {
    header: 'Brand',
    fixed: true,
    field: 'brand',
    sortable: true,
  },
  {
    header: 'Model/Type',
    fixed: true,
    field: 'model_type',
    sortable: true,
  },
  {
    header: 'Alias Name',
    fixed: true,
    field: 'alias',
    sortable: true,
  },
];

const selectedAsset = shallowRef<Asset>();

const singleItem = computed<MenuItem[]>(() => {
  return [
    {
      label: 'Detail Assets',
      route: `${selectedAsset.value?.id}/detail-assets`,
    },
    {
      label: 'Edit',
    },
  ];
});
</script>

<template>
  <DataTable
    :columns="tableColumns"
    :data="response"
    :options="singleItem"
    @toggle-option="selectedAsset = $event"
    selection-type="none"
    use-paginator
  />
</template>
