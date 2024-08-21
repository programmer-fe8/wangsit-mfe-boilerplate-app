import { GetOptionsParams } from '@/dto/user.dto';
import { FilterField } from 'wangsvue/components/filtercontainer/FilterContainer.vue.d';
import { MultiSelectOption } from 'wangsvue/types/options.type';
import UserServices from '@/services/example.service';

export const quickFilterFields: FilterField[] = [
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

export const filterFields: FilterField[] = [
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
