<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue';

import { MenuItem } from 'wangsvue/components/menuitem';

import {
  FetchResponse,
  TableColumn,
  TableCellComponent,
} from 'wangsvue/components/datatable/DataTable.vue';

import { BadgeGroup, DataTable, DialogConfirm } from 'wangsvue';

import { CustomField } from '@/types/customfield.type';

import CustomFieldHeader from './CustomFieldHeader.vue';
import CustomFieldFilter from './CustomFieldFilter.vue';
import CustomFieldForm from './CustomFieldForm.vue';

const fieldSingleAction: MenuItem[] = [
  {
    label: 'Edit',
    icon: 'edit',
    command: (): void => {
      showForm.value = true;
    },
  },
  {
    label: 'Delete',
    icon: 'delete-bin',
    danger: true,
  },
];

// TODO: Ini jadi const aja
const fieldTableColumn = computed<TableColumn[]>(() => {
  return [
    {
      field: 'active',
      header: 'Active',
      sortable: true,
      fixed: true,
      preset: {
        type: 'toggle',
        confirmDialogProps: {
          header: 'Test',
          severity: 'danger',
          listLabel: 'fieldName',
        },
      },
    },
    {
      field: 'fieldName',
      header: 'Field Name',
      sortable: true,
      fixed: true,
    },
    {
      field: 'dataType',
      header: 'Data Type',
      sortable: true,
      fixed: true,
    },
    {
      field: 'value',
      header: 'Value',
      sortable: true,
      fixed: true,
      bodyComponent: (data: CustomField): TableCellComponent => {
        return {
          component: BadgeGroup,
          props: {
            labels: data.value,
            limit: 2,
            severity: 'primary',
          },
        };
      },
    },
    {
      field: 'required',
      header: 'Required',
      sortable: true,
      fixed: true,
    },
    {
      field: 'itemName',
      header: 'Item Name',
      sortable: true,
      fixed: true,
      bodyComponent: (data: CustomField): TableCellComponent => {
        return {
          component: BadgeGroup,
          props: {
            labels: data.itemName,
            limit: 2,
            severity: 'primary',
          },
        };
      },
    },
  ];
});

const showDialog = shallowRef<boolean>(false);
const showForm = shallowRef(false);
/*
 * TODO: Semua ref di bawah ganti jadi shallowRef.
 * Kalau actionData karena dia tipe data primitive,
 * kalau selectedField sama totalSelectedField karena properti/elemen di dalamnya enggak bakal diubah.
 * Referensi: Coding guide bagian 6.3.3, 'When to use shallowRef Variables?'
 *
 * Selain itu, selectedField dihapus aja, nanti di event toggle option kayak gini:
 * totalSelectedField = [$event]
 */
const actionData = ref<boolean>(true);
const selectedField = ref<CustomField>();
const totalSelectedField = ref<CustomField[]>();

const getDataTable = async (): Promise<FetchResponse | undefined> => {
  try {
    const response = await fetch('../../../../cypress/fixtures/fields.json');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
</script>

<template>
  <CustomFieldHeader
    :selected-fields="totalSelectedField as CustomField[]"
    @show-form="
      showForm = $event;
      selectedField = undefined;
    "
  />
  <CustomFieldFilter />
  <DataTable
    :columns="fieldTableColumn"
    :fetch-function="getDataTable"
    :options="fieldSingleAction"
    @select-data="totalSelectedField = $event"
    @toggle-option="selectedField = $event"
    table-name="custom-field"
  />
  <CustomFieldForm v-model:visible="showForm" :field="selectedField" />
  <DialogConfirm
    v-model:visible="showDialog"
    @hide="console.log(actionData)"
    header="Any"
    severity="danger"
  />
</template>
