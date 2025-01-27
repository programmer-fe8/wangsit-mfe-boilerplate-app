<script setup lang="ts">
import { shallowRef } from 'vue';

import {
  ButtonRadio,
  DialogForm,
  Dropdown,
  InputText,
  InputBadge,
  MultiSelect,
} from 'wangsvue';
import { CustomField } from '@/types/customfield.type';
import { DropdownOption } from 'wangsvue/types/options.type';

const props = defineProps<{ field?: CustomField }>();

const visible = defineModel<boolean>('visible', {
  required: true,
  default: false,
});

const itemNameOptions: DropdownOption[] = [
  {
    label: 'Laptop',
    value: 'laptop',
  },
  {
    label: 'Pendingin',
    value: 'pendingin',
  },
  {
    label: 'Sound',
    value: 'sound',
  },
];

const temporaryOption: DropdownOption[] = [
  { label: 'Text Area', value: 'textarea' },
  { label: 'Dropdown', value: 'dropdown' },
  { label: 'Multiselect', value: 'multiselect' },
];

const selectedDataType = shallowRef<string>();
const modelRadio = shallowRef();

const resetValue = (): void => {
  selectedDataType.value = undefined;
};
</script>

<template>
  <DialogForm
    v-model:visible="visible"
    :buttons-template="['submit', 'cancel', 'clear']"
    :closable="false"
    @clear="resetValue"
    @close="resetValue"
    @show="modelRadio = 'no'"
    cancel-btn-label="Cancel"
    clear-btn-label="Clear Field"
    header="Create Custom"
    severity="danger"
    show-stay-checkbox
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
        :initial-value="props.field?.dataType"
        :options="temporaryOption"
        label="Data Type"
        mandatory
        option-label="label"
        option-value="value"
        placeholder="Select data type"
      />
      <InputBadge
        :class="selectedDataType?.toLowerCase() === 'dropdown' ? '' : 'hidden'"
        field-info="Press enter to add new value"
        field-name="value"
        label="Value"
        mandatory
        type="text"
        use-validator
      />
      <div class="flex justify-between items-center">
        <div class="flex items-center">Required?</div>
        <div class="flex gap-2">
          <ButtonRadio v-model="modelRadio" label="Yes" value="yes" />
          <ButtonRadio v-model="modelRadio" label="No" value="no" />
        </div>
      </div>
      <MultiSelect
        :options="itemNameOptions"
        :show-optional-text="false"
        field-info="Custom fields will be applied to each item SKU under the selected item name."
        label="Item Name"
        option-label="label"
        option-value="value"
        placeholder="Select item name"
      />
    </template>
  </DialogForm>
</template>
