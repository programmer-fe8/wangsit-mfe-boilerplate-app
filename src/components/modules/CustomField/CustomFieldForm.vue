<script setup lang="ts">
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
</script>

<template>
  <DialogForm
    v-model:visible="visible"
    :buttons-template="['submit', 'cancel', 'clear']"
    :closable="false"
    header="Create Custom"
    severity="danger"
    show-stay-checkbox
    width="small"
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
      <Dropdown label="Data Type" mandatory />
      <InputBadge
        :existing-values="['ada@mailnesia.com']"
        field-info="Input badge info"
        field-name="emails"
        label="Value"
        mandatory
        type="email"
        use-validator
      />
      <div class="flex justify-between">
        Required?
        <div class="flex gap-2">
          <ButtonRadio label="Yes" value="yes" />
          <ButtonRadio label="No" value="no" />
        </div>
      </div>
      <MultiSelect
        :show-optional-text="false"
        label="Status"
        option-label="label"
        option-value="value"
        placeholder="Pilih status"
      />
    </template>
  </DialogForm>
</template>
