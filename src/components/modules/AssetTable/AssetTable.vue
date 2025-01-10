<script setup lang="ts">
import { computed, shallowRef } from 'vue';

import { Badge, DataTable } from 'wangsvue';
import {
  TableCellComponent,
  TableColumn,
  FetchResponse,
  QueryParams,
} from 'wangsvue/components/datatable/DataTable.vue';
import { Asset } from '@/types/asset.type';
import { MenuItem } from 'wangsvue/components/menuitem';

import response from './data/response.json';

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
    bodyComponent: (data: Asset): TableCellComponent => {
      return {
        component: Badge,
        props: {
          label: data.group,
          severity: 'primary',
        },
      };
    },
  },
  {
    header: 'Category',
    fixed: true,
    field: 'category',
    sortable: true,
    bodyComponent: (data: Asset): TableCellComponent => {
      return {
        component: Badge,
        props: {
          label: data.category,
          severity: 'primary',
        },
      };
    },
  },
  {
    header: 'Brand',
    fixed: true,
    field: 'brand',
    sortable: true,
    bodyComponent: (data: Asset): TableCellComponent => {
      return {
        component: Badge,
        props: {
          label: data.brand,
          severity: 'dark',
        },
      };
    },
  },
  {
    header: 'Model/Type',
    fixed: true,
    field: 'model_type',
    sortable: true,
    bodyComponent: (data: Asset): TableCellComponent => {
      return {
        component: Badge,
        props: {
          label: data.model_type,
          severity: 'dark',
        },
      };
    },
  },
  {
    header: 'Alias Name',
    fixed: true,
    field: 'alias',
    sortable: true,
  },
];

const getTableData = async (
  params: QueryParams,
): Promise<FetchResponse | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const startIndex = ((params.page || 1) - 1) * (params.limit || 10); // Default limit to 10 if not provided
      const endIndex = startIndex + (params.limit || 10);

      const data =
        params.page !== null && params.limit !== null
          ? response.slice(startIndex, endIndex)
          : response;

      resolve({
        message: '',
        data: {
          data,
          totalRecords: response.length,
        },
      });
    }, 500); // You can adjust the timeout if you need a delay
  });
};

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
    :fetch-function="getTableData"
    :options="singleItem"
    @toggle-option="selectedAsset = $event"
    selection-type="none"
    use-paginator
  />
</template>
