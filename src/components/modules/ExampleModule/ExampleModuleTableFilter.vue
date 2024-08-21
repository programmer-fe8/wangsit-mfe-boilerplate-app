<script setup lang="ts">
import { FilterContainer } from 'wangsvue';
import { filterFields } from './options/filterFields';
</script>
<template>
  <FilterContainer :fields="filterFields" table-name="user-list" />
</template>
