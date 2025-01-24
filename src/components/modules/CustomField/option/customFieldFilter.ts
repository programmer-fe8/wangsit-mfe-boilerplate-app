import { FilterField } from 'wangsvue/components/filtercontainer/FilterContainer.vue';
import { MultiSelectOption } from 'wangsvue/types/options.type';

export const customFilterFields: FilterField[] = [
  {
    label: 'Active',
    field: 'isActive',
    type: 'multiselect',
    placeholder: 'Pilih status',
    fetchOptionFn: (): MultiSelectOption[] => [
      { label: 'Aktif', value: true },
      { label: 'Tidak Aktif', value: false },
    ],
  },
  {
    label: 'Aktif',
    field: 'isActive',
    type: 'multiselect',
    placeholder: 'Pilih status',
    fetchOptionFn: (): MultiSelectOption[] => [
      { label: 'Aktif', value: true },
      { label: 'Tidak Aktif', value: false },
    ],
  },
  {
    label: 'Aktif',
    field: 'isActive',
    type: 'multiselect',
    placeholder: 'Pilih status',
    fetchOptionFn: (): MultiSelectOption[] => [
      { label: 'Aktif', value: true },
      { label: 'Tidak Aktif', value: false },
    ],
  },
];
