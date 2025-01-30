<script setup lang="ts">
import { computed, shallowRef } from 'vue';

import { useRoute } from 'vue-router';
import {
  BadgeGroup,
  DataTable,
  DialogConfirm,
  useToast,
  eventBus,
} from 'wangsvue';
import { CustomField } from '@/types/customfield.type';
import { DialogConfirmProps } from 'wangsvue/components/dialogconfirm/DialogConfirm.vue';
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

const activeDialogProps: Omit<DialogConfirmProps, 'visible'> = {
  header: 'Test',
  severity: 'success',
  listLabel: 'fieldName',
};

const inactiveDialogProps: Omit<DialogConfirmProps, 'visible'> = {
  header: 'Test',
  severity: 'danger',
  listLabel: 'fieldName',
};

const fieldTableColumn: TableColumn[] = [
  {
    field: 'active',
    header: 'Active',
    sortable: true,
    fixed: true,
    preset: {
      type: 'toggle',
      onToggle(state): void {
        // Change confirm dialog properties based on state
        if (state) {
          this.confirmDialogProps = activeDialogProps;
        } else {
          this.confirmDialogProps = inactiveDialogProps;
        }
      },
      onConfirm: async (state, data, revertFunction): Promise<void> => {
        try {
          /*
           * Validate action ( active or inactive )
           * if state is true, activate
           */
          if (state) {
            try {
              await CustomFieldService.activateFields([data._id]);
              toast.add({
                severity: 'success',
                message: 'custom field has been activated.',
              });
              eventBus.emit('data-table:update', {
                tableName: tableName.value,
              });
            } catch (error) {
              console.error(error);
              revertFunction();
              toast.add({
                severity: 'error',
                message:
                  'failed to activate custom field. Please check your connection and try again.',
              });
            }
          } else {
            // If state is false, inactivate
            try {
              await CustomFieldService.inactivateFields([data._id]);
              toast.add({
                severity: 'success',
                message: 'custom field has been inactivated.',
              });
              eventBus.emit('data-table:update', {
                tableName: tableName.value,
              });
            } catch (error) {
              console.error(error);
              revertFunction();
              toast.add({
                severity: 'error',
                message:
                  'failed to inactivate custom field. Please check your connection and try again.',
              });
            }
          }
        } catch (error) {
          console.error(error);
        }
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

const activationField = async (): Promise<void> => {
  // Validate action ( activate or inactivate )
  if (activationDialogType.value) {
    try {
      await CustomFieldService.activateFields(
        selectedFieldByCheckBox.value.map((field) => field._id),
      );
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
    }
  } else {
    try {
      await CustomFieldService.inactivateFields(
        selectedFieldByCheckBox.value.map((field) => field._id),
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
      await CustomFieldService.deleteFields(
        selectedFieldByCheckBox.value.map((field) => field._id),
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
      await CustomFieldService.deleteFields(
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
    :list="selectedFieldByCheckBox"
    :message="
      activationDialogType
        ? 'Are you sure you want to activate it'
        : 'Are you sure you want to inactivate it'
    "
    :severity="activationDialogType ? 'success' : 'danger'"
    @confirm="activationField"
    list-label="fieldName"
  />
  <DialogConfirm
    v-model:visible="showDeleteDialog"
    :list="isBulkDeleteDialog ? selectedFieldByCheckBox : selectedField"
    @confirm="deleteFields"
    @hide="isBulkDeleteDialog = false"
    header="Any"
    list-label="fieldName"
    severity="danger"
  />
</template>
