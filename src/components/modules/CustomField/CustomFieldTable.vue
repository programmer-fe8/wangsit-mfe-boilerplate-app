<script setup lang="ts">
import { computed, shallowRef } from 'vue';

import { useRoute } from 'vue-router';
import { BadgeGroup, DataTable, DialogConfirm } from 'wangsvue';
import { CustomField } from '@/types/customfield.type';
import { MenuItem } from 'wangsvue/components/menuitem';
import {
  FetchResponse,
  TableColumn,
  TableCellComponent,
  QueryParams,
} from 'wangsvue/components/datatable/DataTable.vue';

import CustomFieldHeader from './CustomFieldHeader.vue';
import CustomFieldFilter from './CustomFieldFilter.vue';
import CustomFieldService from '@/services/customfield.service';
import CustomFieldForm from './CustomFieldForm.vue';

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

const isBulkDeleteDialog = shallowRef<boolean>();
const typeActivationDialog = shallowRef<boolean>();
const showDialog = shallowRef<boolean>(false);
const showDeleteDialog = shallowRef<boolean>(false);
const showForm = shallowRef<boolean>(false);
const actionData = shallowRef<boolean>(true);
const selectedFields = shallowRef<CustomField[]>();
const selectedFieldByCheckBox = shallowRef<CustomField[]>([]);

const tableName = computed<string>(() => {
  const { type } = route.params;
  return type === 'specific' ? '/customfield/specific' : '/customfield/global';
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

const handleActive = (field: CustomField[], state: boolean): void => {
  selectedFieldByCheckBox.value = field;
  typeActivationDialog.value = state;
  showDialog.value = true;
};

const handleDelete = (field: CustomField[], state: boolean): void => {
  selectedFieldByCheckBox.value = field;
  isBulkDeleteDialog.value = state;
  showDeleteDialog.value = true;
};
</script>

<template>
  <CustomFieldHeader
    v-model:visible="showForm"
    :field-detail="selectedFields as CustomField[]"
    :selected-fields="selectedFieldByCheckBox as CustomField[]"
    :table-name="tableName"
    @activation-field="
      (field, state) => {
        handleActive(field, state);
      }
    "
    @delete-field="(field, state) => handleDelete(field, state)"
    @show-form="showForm = $event"
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
    @select-data="
      selectedFieldByCheckBox = $event;
      console.log(selectedFieldByCheckBox);
    "
    @toggle-option="
      selectedFields = [$event];
      console.log(selectedFields);
    "
    use-paginator
  />
  <CustomFieldForm v-model:visible="showForm" :field="selectedFields?.[0]" />
  <DialogConfirm
    v-model:visible="showDialog"
    :header="typeActivationDialog ? 'Activate' : 'Deactivate'"
    :list="selectedFieldByCheckBox"
    :message="
      typeActivationDialog
        ? 'Are you sure you want to activate it'
        : 'Are you sure you want to unactivate it'
    "
    :severity="typeActivationDialog ? 'success' : 'danger'"
    @hide="console.log(actionData)"
    list-label="fieldName"
  />
  <DialogConfirm
    v-model:visible="showDeleteDialog"
    :list="isBulkDeleteDialog ? selectedFieldByCheckBox : selectedFields"
    @hide="
      console.log(actionData);
      isBulkDeleteDialog = false;
    "
    header="Any"
    list-label="fieldName"
    severity="danger"
  />
</template>
