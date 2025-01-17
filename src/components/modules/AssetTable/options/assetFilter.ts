import { FilterField } from 'wangsvue/components/filtercontainer/FilterContainer.vue';
import { MultiSelectOption } from 'wangsvue/types/options.type';

export const assetFilterFields: FilterField[] = [
  {
    label: 'Asset',
    field: 'asset',
    type: 'multiselect',
    placeholder: 'Select asset name',
    fetchOptionFn(): MultiSelectOption[] {
      return [
        { label: 'Sound System', value: 'sound_system' },
        { label: 'AC Portable Indoor', value: 'ac_portable_indoor' },
        { label: 'Microphone', value: 'microphone' },
      ];
    },
  },
  {
    label: 'Group',
    field: 'group',
    type: 'multiselect',
    placeholder: 'Select group',
    fetchOptionFn(): MultiSelectOption[] {
      return [
        { label: 'Room', value: 'room' },
        { label: 'Warehouse', value: 'warehouse' },
        { label: 'Garage', value: 'garage' },
      ];
    },
  },
  {
    label: 'Brand',
    field: 'brand',
    type: 'multiselect',
    placeholder: 'Select brand',
    fetchOptionFn(): MultiSelectOption[] {
      return [
        { label: 'Samsung', value: 'samsung' },
        { label: 'Hyundai', value: 'hyundai' },
        { label: 'Apple', value: 'apple' },
      ];
    },
  },
  {
    label: 'Model/Type',
    field: 'model',
    type: 'multiselect',
    placeholder: 'Select model',
    fetchOptionFn(): MultiSelectOption[] {
      return [
        { label: 'Macbook Pro', value: 'macbook_pro' },
        { label: 'Ioniq 5', value: 'ioniq_5' },
        { label: 'Ultra 24', value: 'ultra_24' },
      ];
    },
  },
];
