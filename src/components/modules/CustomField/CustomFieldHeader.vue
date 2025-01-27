<script setup lang="ts">
import {
  Button,
  ButtonBulkAction,
  ButtonDownload,
  ButtonFilter,
  ButtonSearch,
  Changelog,
} from 'wangsvue';

import { CustomField } from '@/types/customfield.type';
import { MenuItem } from 'wangsvue/components/menuitem';

const emit = defineEmits<{
  showForm: [state: boolean];
  deleteField: [field: CustomField[], state: boolean];
  activationField: [field: CustomField[], state: boolean];
}>();

const props = defineProps<{
  selectedFields: CustomField[];
  tableName: string;
}>();

const bulkAction: MenuItem[] = [
  {
    label: 'Active',
    icon: 'check',
    command: (): void => {
      emit('activationField', props.selectedFields, true);
    },
  },
  {
    label: 'Unactive',
    icon: 'close',
    command: (): void => {
      emit('activationField', props.selectedFields, false);
    },
  },
  {
    label: 'Delete',
    icon: 'delete-bin',
    danger: true,
    command: (): void => {
      emit('deleteField', props.selectedFields, true);
    },
  },
];
</script>

<template>
  <div class="flex justify-between items-center">
    <div>
      <ButtonBulkAction
        :options="bulkAction"
        :selected-data="props.selectedFields"
        :table-name="props.tableName"
      />
    </div>
    <div class="flex">
      <ButtonSearch :table-name="props.tableName" class="ml-4" />
      <ButtonFilter :table-name="props.tableName" class="ml-4" />
      <ButtonDownload class="ml-4 mr-4" />
      <Changelog
        :table-name="props.tableName"
        header="Changelog: Custom Field > Any"
        object="Tim"
      />
      <Button
        @click="$emit('showForm', true)"
        class="ml-4"
        label="+ Custom Field"
        severity="secondary"
      />
    </div>
  </div>
</template>
