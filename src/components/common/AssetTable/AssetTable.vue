<script setup lang="ts">
import { computed } from 'vue';
import { DataTable } from 'wangsvue';
import { Data, TableColumn } from 'wangsvue/components/datatable/DataTable.vue';
import response from './data/response.json';

const tableColumns = computed<TableColumn[]>(() => {
  return [
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
});
</script>

<template>
  <DataTable
    :columns="tableColumns"
    :data="response as Data[]"
    selectionType="none"
    use-paginator
  />
</template>
