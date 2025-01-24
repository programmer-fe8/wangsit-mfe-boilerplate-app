<script setup lang="ts">
import {
  Button,
  ButtonBulkAction,
  ButtonDownload,
  ButtonFilter,
  ButtonSearch,
  Changelog,
} from 'wangsvue';

defineEmits<{
  showForm: [value: boolean];
}>();

defineProps<{
  selectedFields: CustomField[];
}>();

/*
 * TODO: Import sebelum define emit sama props
 * Referensi: Coding guide bagian 5.1
 */
import { CustomField } from '@/types/customfield.type';

import { MenuItem } from 'wangsvue/components/menuitem';

const bulkAction: MenuItem[] = [
  {
    label: 'Active',
    icon: 'check',
  },
  {
    label: 'Unactive',
    icon: 'close',
  },
  {
    label: 'Delete',
    icon: 'delete-bin',
    danger: true,
  },
];
</script>

<template>
  <div class="flex justify-between items-center">
    <div>
      <ButtonBulkAction
        :options="bulkAction"
        :selected-data="selectedFields"
        table-name="custom-field"
      />
    </div>
    <div class="flex">
      <ButtonSearch class="ml-4" table-name="custom-field" />
      <ButtonFilter class="ml-4" table-name="custom-field" />
      <ButtonDownload class="ml-4 mr-4" />
      <Changelog
        header="Changelog: Custom Field > Any"
        object="Tim"
        table-name="normal-changelog"
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
