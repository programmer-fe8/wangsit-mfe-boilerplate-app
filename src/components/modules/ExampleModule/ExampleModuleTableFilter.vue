<script setup lang="ts">
import { GetOptionsParams } from '@/dto/user.dto';
import { FilterField } from 'wangsvue/components/filtercontainer/FilterContainer.vue.d';
import { MultiSelectOption } from 'wangsvue/types/options.type';
import UserServices from '@/services/example.service';
import { FilterContainer } from 'wangsvue';

const filterFields: FilterField[] = [
  {
    label: 'Country',
    field: 'country',
    type: 'multiselect',
    placeholder: 'Select country',
    fetchOptionFn: async (
      params: GetOptionsParams,
    ): Promise<MultiSelectOption[]> => {
      try {
        const { data } = await UserServices.getOptions(params);
        return data.data.country;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
  {
    label: 'Age',
    fields: ['minAge', 'maxAge'],
    type: 'rangenumber',
    placeholder: '0',
  },
];
</script>
<template>
  <FilterContainer :fields="filterFields" table-name="user-list" />
</template>
