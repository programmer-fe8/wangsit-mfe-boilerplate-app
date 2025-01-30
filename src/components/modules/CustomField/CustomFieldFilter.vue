<script setup lang="ts">
import { computed } from 'vue';

import { FilterContainer } from 'wangsvue';
import { customFilterFields } from './option/customFieldFilter';
import { useRoute } from 'vue-router';

defineProps<{
  tableName: string;
}>();

const route = useRoute();

const filterFields = computed(() => {
  const isSpecific = route.params.type === 'specific';
  return customFilterFields(isSpecific);
});
</script>
<template>
  <FilterContainer
    :key="tableName"
    :fields="filterFields"
    :table-name="tableName"
  />
</template>
