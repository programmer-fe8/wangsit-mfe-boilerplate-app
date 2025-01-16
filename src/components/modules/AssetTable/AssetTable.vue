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

import AssetServices from '@/services/assets.service';

const emit = defineEmits<{
  editAsset: [asset: Asset];
}>();

const tableColumns: TableColumn[] = [
  {
    header: 'Assets',
    fixed: true,
    field: 'name',
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
          label: data.model,
          severity: 'dark',
        },
      };
    },
  },
  {
    header: 'Alias Name',
    fixed: true,
    field: 'aliasName',
    sortable: true,
  },
];

const selectedAsset = shallowRef<Asset>();

const singleItem = computed<MenuItem[]>(() => {
  return [
    {
      label: 'Detail Assets',
      route: `${selectedAsset.value?._id}/detail-assets`,
    },
    {
      label: 'Edit',
      command: (): void => {
        emit('editAsset', selectedAsset.value as Asset);
      },
    },
  ];
});

const getTableData = async (
  params: QueryParams,
): Promise<FetchResponse | undefined> => {
  try {
    const { data } = await AssetServices.getAssetsData(params);
    return data;
  } catch (error) {
    console.error('Error fetching assets:', error);
  }
};
</script>

<template>
  <DataTable
    :columns="tableColumns"
    :fetch-function="getTableData"
    :options="singleItem"
    @toggle-option="selectedAsset = $event"
    scrollable
    selection-type="none"
    use-paginator
  />
</template>
