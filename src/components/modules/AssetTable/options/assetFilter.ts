import { FilterField } from 'wangsvue/components/filtercontainer/FilterContainer.vue';
import { MultiSelectOption } from 'wangsvue/types/options.type';
import AssetServices from '@/services/assets.service';

const fetchAssetOptions = async (
  assetOptionKey: string,
): Promise<MultiSelectOption[]> => {
  try {
    const { data } = await AssetServices.getAssetOptions({
      [assetOptionKey]: true,
    });
    return data?.data?.[assetOptionKey];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const assetFilterFields: FilterField[] = [
  {
    label: 'Asset',
    field: 'asset',
    type: 'multiselect',
    placeholder: 'Select asset name',
    fetchOptionFn: () => fetchAssetOptions('nameOptions'),
  },
  {
    label: 'Group',
    field: 'group',
    type: 'multiselect',
    placeholder: 'Select group',
    fetchOptionFn: () => fetchAssetOptions('groupOptions'),
  },
  {
    label: 'Brand',
    field: 'brand',
    type: 'multiselect',
    placeholder: 'Select brand',
    fetchOptionFn: () => fetchAssetOptions('brandOptions'),
  },
  {
    label: 'Model/Type',
    field: 'model',
    type: 'multiselect',
    placeholder: 'Select model',
    fetchOptionFn: () => fetchAssetOptions('modelOptions'),
  },
];
