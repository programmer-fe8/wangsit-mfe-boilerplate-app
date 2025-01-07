<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import {
  ButtonDownload,
  ButtonFilter,
  ButtonSearch,
  DataTable,
} from 'wangsvue';
import { MenuItem } from 'wangsvue/components/menuitem';
import { Data, TableColumn } from 'wangsvue/components/datatable/DataTable.vue';
import response from './data/response.json';

const showDialog = shallowRef<boolean>(false);

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
  <div class="flex justify-end items-center">
    <ButtonSearch class="mr-5" />
    <ButtonFilter class="mr-5" />
    <button
      @click="showDialog = true"
      class="bg-gray-800 text-white px-4 py-2 rounded-2xl"
    >
      + Register
    </button>
    <Button />
  </div>
  <DataTable
    :columns="tableColumns"
    :data="response as Data[]"
    use-paginator
    selectionType="none"
  />
</template>
