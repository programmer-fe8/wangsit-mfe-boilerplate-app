<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { DataTable } from 'wangsvue';
import { Data, TableColumn } from 'wangsvue/components/datatable/DataTable.vue';
import response from './data/response.json';
import { Asset } from '@/types/asset.type';
import { MenuItem } from 'wangsvue/components/menuitem';

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
</script>

<template>
  <DataTable
    :columns="tableColumns"
    :data="response as Data[]"
    :options="singleItem"
    @toggle-option="selectedAsset = $event"
    selection-type="none"
    use-paginator
  />
</template>
