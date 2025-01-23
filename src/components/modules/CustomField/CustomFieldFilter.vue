<script setup lang="ts">
import { FilterContainer } from 'wangsvue';
import { assetFilterFields } from '../AssetTable/options/assetFilter';
</script>
<template>
  <FilterContainer :fields="assetFilterFields" table-name="custom-field" />
</template>
