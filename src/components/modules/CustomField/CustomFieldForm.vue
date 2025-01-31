<script setup lang="ts">
import { shallowRef, ref, watch } from 'vue';

import {
  ButtonRadio,
  DialogForm,
  Dropdown,
  InputText,
  InputBadge,
  MultiSelect,
  useToast,
  eventBus,
} from 'wangsvue';
import { CustomField } from '@/types/customfield.type';
import { DropdownOption } from 'wangsvue/types/options.type';
import { FormValue } from 'wangsvue/components/form/Form.vue';
import { useRoute } from 'vue-router';

import CustomFieldService from '@/services/customfield.service';

const props = defineProps<{ field?: CustomField; tableName: string }>();

const visible = defineModel<boolean>('visible', {
  required: true,
  default: false,
});

const route = useRoute();
const toast = useToast();

const itemNameOptions: DropdownOption[] = [
  {
    label: 'Laptop',
    value: 'Laptop',
  },
  {
    label: 'Pendingin',
    value: 'Pendingin',
  },
  {
    label: 'Sound',
    value: 'Sound',
  },
];

const datatypeOptions: DropdownOption[] = [
  { label: 'Text', value: 'text' },
  { label: 'Text Area', value: 'textarea' },
  { label: 'Dropdown', value: 'dropdown' },
  { label: 'Multi Dropdown', value: 'multi_dropdown' },
  { label: 'Date', value: 'date' },
  { label: 'Datetime', value: 'datetime' },
  { label: 'Currency', value: 'currency' },
  { label: 'Numeric', value: 'numeric' },
  { label: 'Phone', value: 'phone' },
  { label: 'Percentage', value: 'percentage' },
  { label: 'Email', value: 'email' },
  { label: 'URL', value: 'url' },
  { label: 'Document', value: 'document' },
];

const selectedDataType = shallowRef<string>();
const modelRadio = shallowRef<boolean>();

const formValues = ref<FormValue>();

const apply = async (e: {
  formValues: FormValue & CustomField;
  stayAfterSubmit: boolean;
}): Promise<void> => {
  try {
    formValues.value = e.formValues;
    const fieldData = { ...e.formValues, required: modelRadio.value };
    // Validate
    if (props.field?._id) {
      try {
        await CustomFieldService.editCustomField(
          props.field._id,
          fieldData as CustomField,
        );
        toast.add({
          severity: 'success',
          message: 'custom field has been edited.',
        });
        eventBus.emit('data-table:update', {
          tableName: props.tableName,
        });
      } catch (error) {
        console.error(error);
        toast.add({
          severity: 'error',
          message:
            'failed to edit custom field. Please check your connection and try again.',
        });
      }
    } else {
      try {
        await CustomFieldService.createCustomField(
          { specific: route.path === '/customfield/specific' },
          fieldData as CustomField,
        );
        toast.add({
          severity: 'success',
          message: 'custom field has been created.',
        });
        eventBus.emit('data-table:update', {
          tableName: props.tableName,
        });
      } catch (error) {
        console.error(error);
        toast.add({
          severity: 'error',
          message:
            'failed to create custom field. Please check your connection and try again.',
        });
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    modelRadio.value = false;
  }
};

const resetValue = (): void => {
  selectedDataType.value = undefined;
  modelRadio.value = false;
};

watch(
  () => props.field?.dataType,
  () => (selectedDataType.value = props.field?.dataType),
);
</script>

<!-- eslint-disable vue/html-indent -->
<template>
  <DialogForm
    v-model:visible="visible"
    :buttons-template="['submit', 'cancel', 'clear']"
    :closable="false"
    :header="props.field?._id ? 'Edit Custom Field' : 'Create Custom Field'"
    :show-stay-checkbox="props.field ? false : true"
    @clear="resetValue"
    @close="resetValue"
    @show="
      props.field?.required ? (modelRadio = true) : (modelRadio = false);
      selectedDataType = props.field?.dataType as string;
    "
    @submit="apply"
    cancel-btn-label="Cancel"
    clear-btn-label="Clear Field"
    severity="danger"
    stay-checkbox-label="Stay on this after submiting"
    submit-btn-label="Create"
    width="medium"
  >
    <template #fields>
      <InputText
        :model-value="props.field?.fieldName"
        :validator-message="{
          exceed: 'Max. 30 characters',
          empty: 'Field name must not be empty',
          exist: 'Field name already exist',
        }"
        field-name="fieldName"
        label="Field Name"
        mandatory
        placeholder="Enter field name"
        use-validator
      />
      <Dropdown
        v-model="selectedDataType"
        :initial-value="selectedDataType"
        :options="datatypeOptions"
        field-name="dataType"
        label="Data Type"
        mandatory
        option-label="label"
        option-value="value"
        placeholder="Select data type"
        use-validator
        validator-message="You must pick a data type"
      />
      <InputBadge
        :class="
          selectedDataType === 'dropdown' ||
          selectedDataType === 'multi_dropdown'
            ? ''
            : 'hidden'
        "
        :initial-value="props.field?.value"
        :mandatory="
          selectedDataType === 'dropdown' ||
          selectedDataType === 'multi_dropdown'
        "
        field-info="Press enter to add new value"
        field-name="value"
        label="Value"
        type="text"
        use-validator
        validator-message="You must add at least one value"
      />
      <div class="flex justify-between items-center">
        <div class="flex items-center">Required?</div>
        <div class="flex gap-2">
          <ButtonRadio v-model="modelRadio" :value="true" label="Yes" />
          <ButtonRadio v-model="modelRadio" :value="false" label="No" />
        </div>
      </div>
      <MultiSelect
        :initial-value="props.field?.itemName"
        :options="itemNameOptions"
        :show-optional-text="false"
        field-info="Custom fields will be applied to each item SKU under the selected item name."
        field-name="itemName"
        label="Item Name"
        mandatory
        option-label="label"
        option-value="value"
        placeholder="Select item name"
        use-validator
      />
    </template>
  </DialogForm>
</template>
