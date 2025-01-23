<script setup lang="ts">
import { computed, shallowRef } from 'vue';

import { Asset } from '@/types/asset.type';
import { assetFilterFields } from './options/assetFilter';
import {
  Badge,
  Button,
  ButtonFilter,
  ButtonSearch,
  Changelog,
  DataTable,
  FilterContainer,
} from 'wangsvue';
import {
  FetchResponse,
  TableCellComponent,
  TableColumn,
  QueryParams,
} from 'wangsvue/components/datatable/DataTable.vue';
import { MenuItem } from 'wangsvue/components/menuitem';

import AssetForm from './AssetForm.vue';
import AssetServices from '@/services/assets.service';

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
    bodyComponent: (data: Asset) => createBadgeCell(data, 'group', 'primary'),
  },
  {
    header: 'Category',
    fixed: true,
    field: 'category',
    sortable: true,
    bodyComponent: (data: Asset) =>
      createBadgeCell(data, 'category', 'primary'),
  },
  {
    header: 'Brand',
    fixed: true,
    field: 'brand',
    sortable: true,
    bodyComponent: (data: Asset) => createBadgeCell(data, 'brand', 'dark'),
  },
  {
    header: 'Model/Type',
    fixed: true,
    field: 'model_type',
    sortable: true,
    bodyComponent: (data: Asset) => createBadgeCell(data, 'model', 'dark'),
  },
  {
    header: 'Alias Name',
    fixed: true,
    field: 'aliasName',
    sortable: true,
  },
];

const selectedAsset = shallowRef<Asset>();
const showForm = shallowRef(false);
const showFilter = shallowRef(false);

const singleItem = computed<MenuItem[]>(() => {
  return [
    {
      label: 'Detail Assets',
      icon: 'file-copy-2-line',
      route: `${selectedAsset.value?._id}/detail-assets`,
    },
    {
      label: 'Edit',
      icon: 'edit',
      command: (): void => {
        showForm.value = true;
      },
    },
  ];
});

// Fetching Data
const getTableData = async (
  params: QueryParams,
): Promise<FetchResponse | undefined> => {
  try {
    const { data } = await AssetServices.getAssetsData(params);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const createBadgeCell = (
  data: Asset,
  field: keyof Asset,
  severity: 'primary' | 'dark',
): TableCellComponent => ({
  component: Badge,
  props: {
    label: data[field],
    severity,
  },
});
</script>

<template>
  <div class="flex justify-end items-center">
    <ButtonSearch class="mr-5" />
    <ButtonFilter v-model:show-filter="showFilter" class="mr-6" />
    <Changelog
      header="Changelog"
      object="selectedAsset"
      table-name="normal-changelog"
    />
    <Button
      id="btn-dialog-form"
      @click="
        showForm = true;
        selectedAsset = undefined;
      "
      class="ml-5"
      label="+ Register"
      severity="secondary"
    />
  </div>
  <FilterContainer v-show="showFilter" :fields="assetFilterFields" />

  <DataTable
    :columns="tableColumns"
    :fetch-function="getTableData"
    :options="singleItem"
    @toggle-option="selectedAsset = $event"
    scrollable
    selection-type="checkbox"
    table-name="asset-list"
    use-paginator
  />
  <AssetForm v-model:visible="showForm" :asset="selectedAsset" />
</template>
