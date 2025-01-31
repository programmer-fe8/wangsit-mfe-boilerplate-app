<script setup lang="ts">
import { computed, shallowRef } from 'vue';

import { useRoute } from 'vue-router';
import {
  BadgeGroup,
  Checkbox,
  DataTable,
  DialogConfirm,
  eventBus,
  useToast,
} from 'wangsvue';
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
const toast = useToast();

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
      onToggle(state, data, revertFunction): void {
        showDialog.value = true;

        isToggleActivate.value = true;
        activationDialogType.value = state;
        selectedField.value = [data] as CustomField[];
        handleRevert.value = revertFunction;
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
          headerLabel: 'Value',
        },
      };
    },
  },
  {
    field: 'required',
    header: 'Required',
    sortable: true,
    bodyTemplate: (data: CustomField): string => {
      return data.required ? 'Yes' : 'No';
    },
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
          headerLabel: 'Item Name',
        },
      };
    },
  },
];

// Shallow Ref
const showForm = shallowRef<boolean>(false);
const showDialog = shallowRef<boolean>(false);
const showDeleteDialog = shallowRef<boolean>(false);

const activationDialogType = shallowRef<boolean>();
const isBulkDeleteDialog = shallowRef<boolean>();
const isToggleActivate = shallowRef<boolean>();
const handleRevert = shallowRef<() => void>();

/*
 * SelectedFieldByCheckBox is used for bulk action
 * SelectedField is used for single action
 */
const selectedField = shallowRef<CustomField[]>();
const selectedFieldByCheckBox = shallowRef<CustomField[]>([]);

// Computed
const tableName = computed<string>(() => {
  return route.path === '/customfield/specific' ? 'specific' : 'global';
});

// Function
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

const activationFields = async (
  state: boolean,
  fields: CustomField[],
  revertFunction: () => void,
): Promise<void> => {
  // Validate action ( activate or inactivate )
  if (state) {
    try {
      await CustomFieldService.activateField(fields.map((field) => field._id));
      toast.add({
        severity: 'success',
        message: 'custom field has been activated.',
      });
      eventBus.emit('data-table:update', {
        tableName: tableName.value,
      });
      eventBus.emit('data-table:clear-selected-data', {
        tableName: tableName.value,
      });
    } catch (error) {
      console.error(error);
      toast.add({
        severity: 'error',
        message:
          'failed to activate custom field. Please check your connection and try again.',
      });
      if (isToggleActivate.value) {
        revertFunction();
      }
    }
  } else {
    try {
      await CustomFieldService.inactivateField(
        fields.map((field) => field._id),
      );
      toast.add({
        severity: 'success',
        message: 'custom field has been inactivated.',
      });
      eventBus.emit('data-table:update', {
        tableName: tableName.value,
      });
    } catch (error) {
      console.error(error);
      toast.add({
        severity: 'error',
        message:
          'failed to inactivate custom field. Please check your connection and try again.',
      });
      if (isToggleActivate.value) {
        revertFunction();
      }
    }
  }
};
const deleteFields = async (): Promise<void> => {
  /*
   * Validate action
   * When isBulkDeleteDialog is true ( bulk action ), the argumen of the function is from selectedFieldByCheckBox
   * When isBulkDeleteDialog is false ( single action ), the argumen of the function is from selectedField
   */
  if (isBulkDeleteDialog.value) {
    try {
      await CustomFieldService.deleteField(
        selectedFieldByCheckBox.value.map((field) => field._id) as string[],
      );
      toast.add({
        severity: 'success',
        message: 'custom field has been deleted.',
      });
      eventBus.emit('data-table:update', {
        tableName: tableName.value,
      });
    } catch (error) {
      console.error(error);
      toast.add({
        severity: 'error',
        message:
          'failed to delete custom field. Please check your connection and try again.',
      });
      eventBus.emit('data-table:update', {
        tableName: tableName.value,
      });
    }
  } else {
    try {
      await CustomFieldService.deleteField(
        selectedField.value?.map((field) => field._id) as string[],
      );
      toast.add({
        severity: 'success',
        message: 'custom field has been deleted.',
      });
      eventBus.emit('data-table:update', {
        tableName: tableName.value,
      });
    } catch (error) {
      console.error(error);
      toast.add({
        severity: 'error',
        message:
          'failed to delete custom field. Please check your connection and try again.',
      });
    }
  }
};

const handleActive = (field: CustomField[], state: boolean): void => {
  selectedFieldByCheckBox.value = field;
  activationDialogType.value = state;
  showDialog.value = true;
};

const handleDelete = (field: CustomField[], state: boolean): void => {
  selectedFieldByCheckBox.value = field;
  isBulkDeleteDialog.value = state;
  showDeleteDialog.value = true;
};
</script>

<!-- eslint-disable vue/html-indent -->
<template>
  <CustomFieldHeader
    v-model:visible="showForm"
    :selected-fields="selectedFieldByCheckBox as CustomField[]"
    :table-name="tableName"
    @activation-field="
      (field, state) => {
        handleActive(field, state);
      }
    "
    @delete-field="(field, state) => handleDelete(field, state)"
    @show-form="
      showForm = $event;
      selectedField = undefined;
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
    @select-data="selectedFieldByCheckBox = $event"
    @toggle-option="selectedField = [$event]"
    use-paginator
  />
  <CustomFieldForm
    v-model:visible="showForm"
    :field="selectedField?.[0]"
    :table-name="tableName"
  />
  <DialogConfirm
    v-model:visible="showDialog"
    :header="
      activationDialogType ? 'Activate Custom Field' : 'Inactivate Custom Field'
    "
    :list="isToggleActivate ? selectedField : selectedFieldByCheckBox"
    :severity="activationDialogType ? 'success' : 'danger'"
    @close="handleRevert"
    @confirm="
      isToggleActivate
        ? activationFields(
            activationDialogType as boolean,
            selectedField as CustomField[],
            handleRevert || (() => {}),
          )
        : activationFields(
            activationDialogType as boolean,
            selectedFieldByCheckBox as CustomField[],
            handleRevert || (() => {}),
          );
      handleRevert?.();
    "
    @hide="isToggleActivate = false"
    list-label="fieldName"
  >
    <template #body>
      <div>
        <Checkbox
          v-if="!activationDialogType"
          :model-value="false"
          class="mb-3"
          label="Hide data that has already been entered"
          tooltip="If you uncheck, data that you have been entered will not be hidden in the item and stock detail."
        />
        <span>{{
          activationDialogType
            ? 'Are you sure you want to activate it?'
            : 'Are you sure you want to inactivate it?'
        }}</span>
      </div>
    </template>
  </DialogConfirm>
  <DialogConfirm
    v-model:visible="showDeleteDialog"
    :list="isBulkDeleteDialog ? selectedFieldByCheckBox : selectedField"
    @confirm="deleteFields"
    @hide="isBulkDeleteDialog = false"
    header="Delete Custom Field"
    list-label="fieldName"
    severity="danger"
  >
    <template #body>
      <div>
        <Checkbox
          :model-value="false"
          class="mb-3"
          label="Remove data that has already been entered"
          tooltip="If you uncheck, data that you have been entered will not be removed in the item and stock detail."
        />
        <span>Are you sure you want to delete it</span>
      </div>
    </template>
  </DialogConfirm>
</template>
