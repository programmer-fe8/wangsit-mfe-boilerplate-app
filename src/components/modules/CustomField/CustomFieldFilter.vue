<script setup lang="ts">
import { FilterContainer } from 'wangsvue';
import { customFilterFields } from './option/customFieldFilter';

defineProps<{ tableName: string }>();
</script>
<template>
  <FilterContainer :fields="customFilterFields" :table-name="tableName" />
</template>
