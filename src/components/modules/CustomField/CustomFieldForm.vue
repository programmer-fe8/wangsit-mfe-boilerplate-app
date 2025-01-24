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

defineProps<{ selectedField?: CustomField }>();

const visible = defineModel<boolean>('visible', {
  required: true,
  default: false,
});

const selectedDataType = shallowRef<string>();
const modelRadio = shallowRef();
</script>

<template>
  <DialogForm
    v-model:visible="visible"
    :buttons-template="['submit', 'cancel', 'clear']"
    :closable="false"
    @show="modelRadio = 'no'"
    header="Create Custom"
    severity="danger"
    show-stay-checkbox
    width="medium"
  >
    <template #fields>
      <InputText
        :validator-message="{
          exceed: 'Max. 30 characters',
          empty: 'Field name must not be empty',
          exist: 'Field name already exist',
        }"
        field-name="fieldName"
        label="Field Name"
        mandatory
        use-validator
      />
      <Dropdown v-model="selectedDataType" label="Data Type" mandatory />
      <InputBadge
        class="hidden"
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
        :show-optional-text="false"
        field-info="Custom fields will be applied to each item SKU under the selected item name."
        label="Item Name"
        option-label="label"
        option-value="value"
        placeholder="Pilih status"
      />
    </template>
  </DialogForm>
</template>
