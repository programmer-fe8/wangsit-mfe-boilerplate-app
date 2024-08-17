<script setup lang="ts">
import { DialogConfirm } from 'wangsvue';
import { DialogConfirmProps } from 'wangsvue/components/dialogconfirm/DialogConfirm.vue.d';

defineProps<Omit<DialogConfirmProps, 'header' | 'severity'>>();
const visible = defineModel<boolean>('visible', { default: false });
</script>

<template>
  <DialogConfirm
    v-model:visible="visible"
    @confirm="visible = false"
    header="Delete User"
    header-icon="delete-bin-7"
    severity="danger"
  />
</template>
