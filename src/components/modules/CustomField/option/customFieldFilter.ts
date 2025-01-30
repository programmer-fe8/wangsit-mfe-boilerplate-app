import { FilterField } from 'wangsvue/components/filtercontainer/FilterContainer.vue';
import { MultiSelectOption } from 'wangsvue/types/options.type';

import CustomFieldService from '@/services/customfield.service';

const fetchCustomFieldOptions = async (
  key: string,
  specific: boolean,
): Promise<MultiSelectOption[]> => {
  try {
    const { data } = await CustomFieldService.getCustomFieldOptions({
      [key]: true,
      specific,
    });
    return data?.data?.[key];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const customFilterFields = (specific: boolean): FilterField[] => {
  return [
    {
      label: 'Active',
      field: 'active',
      type: 'multiselect',
      placeholder: 'Select status',
      fetchOptionFn: () => fetchCustomFieldOptions('activeOptions', specific),
    },
    {
      label: 'Data Type',
      field: 'datatype',
      type: 'multiselect',
      placeholder: 'Select data type',
      fetchOptionFn: () => fetchCustomFieldOptions('datatypeOptions', specific),
    },
    {
      label: 'Required',
      field: 'required',
      type: 'multiselect',
      placeholder: 'Select requirement',
      fetchOptionFn: () => fetchCustomFieldOptions('requiredOptions', specific),
    },
  ];
};
