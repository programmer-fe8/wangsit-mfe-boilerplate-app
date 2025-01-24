<script setup lang="ts">
import { computed, shallowRef } from 'vue';

import { useRoute } from 'vue-router';
import { MenuItem } from 'wangsvue/components/menuitem';
import { BadgeGroup, DataTable, DialogConfirm } from 'wangsvue';
import { CustomField } from '@/types/customfield.type';
import {
  FetchResponse,
  TableColumn,
  TableCellComponent,
  QueryParams,
} from 'wangsvue/components/datatable/DataTable.vue';

import CustomFieldHeader from './CustomFieldHeader.vue';
import CustomFieldFilter from './CustomFieldFilter.vue';
import CustomFieldForm from './CustomFieldForm.vue';
import CustomFieldService from '@/services/customfield.service';

const route = useRoute();

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
    command: (): void => {
      showDeleteDialog.value = true;
    },
  },
];

const fieldTableColumn: TableColumn[] = [
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
  },
  {
    field: 'value',
    header: 'Value',
    sortable: true,
    bodyComponent: (data: CustomField): TableCellComponent => {
      return {
        component: BadgeGroup,
        props: {
          labels: data.value || [],
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
  },
  {
    field: 'itemName',
    header: 'Item Name',
    sortable: true,
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

const isActiveDialog = shallowRef<boolean>();

const showDialog = shallowRef<boolean>(false);
const showDeleteDialog = shallowRef<boolean>(false);
const showForm = shallowRef(false);

const actionData = shallowRef<boolean>(true);
const selectedFields = shallowRef<CustomField[]>();

const tableName = computed<string>(() => {
  return `/customfield/${route.params.type === 'specific' ? 'specific' : 'global'}`;
});

const getDataTable = async (
  params: QueryParams,
): Promise<FetchResponse | undefined> => {
  try {
    const { data } = await CustomFieldService.getListCustomField(params);
    return data;
  } catch (err) {
    console.error(err);
  }
};
</script>

<template>
  <CustomFieldHeader
    :selected-fields="selectedFields as CustomField[]"
    :table-name="tableName"
    @active-field="
      (field, state) => {
        selectedFields = field;
        isActiveDialog = state;
        showDialog = true;
      }
    "
    @delete-field="
      showDeleteDialog = true;
      selectedFields = $event;
    "
    @show-form="
      showForm = $event;
      selectedFields = undefined;
    "
  />
  <CustomFieldFilter :table-name="tableName" />
  <DataTable
    :key="tableName"
    :columns="fieldTableColumn"
    :default-query-params="{
      specific: route.path === '/customfield/specific',
    }"
    :fetch-function="getDataTable"
    :options="fieldSingleAction"
    :table-name="tableName"
    @toggle-option="selectedFields = [$event]"
    use-paginator
  />
  <CustomFieldForm v-model:visible="showForm" :field="selectedFields?.[0]" />
  <DialogConfirm
    v-model:visible="showDialog"
    :header="isActiveDialog ? 'Activate' : 'Deactivate'"
    :list="selectedFields"
    :severity="isActiveDialog ? 'success' : 'danger'"
    @hide="console.log(actionData)"
    list-label="fieldName"
  />
  <DialogConfirm
    v-model:visible="showDeleteDialog"
    :list="selectedFields"
    @hide="console.log(actionData)"
    header="Any"
    list-label="fieldName"
    severity="danger"
  />
</template>
