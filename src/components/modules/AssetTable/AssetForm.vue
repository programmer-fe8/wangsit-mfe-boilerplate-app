<script setup lang="ts">
import { ref, shallowRef } from 'vue';

import { Asset } from '@/types/asset.type';
import { DropdownProps } from 'wangsvue/components/dropdown/Dropdown.vue';
import {
  DialogForm,
  Dropdown,
  InputText,
  ImageCompressor,
  useToast,
} from 'wangsvue';
import { DropdownOption } from 'wangsvue/types/options.type';
import { FormValue } from 'wangsvue/components/form/Form.vue';

import AssetServices from '@/services/assets.service';

const props = defineProps<{ asset?: Asset }>();

const toast = useToast();

const AssetDropdownProps: DropdownProps = {
  optionLabel: 'label',
  optionValue: 'value',
  useValidator: true,
  mandatory: true,
};

const badgeTooltip: string =
  'You can input an alias name for convenience in searching for assets\n' +
  'and to differentiate them from others';

const names: DropdownOption[] = [
  {
    label: 'MacBook Pro',
    value: 'macbook_pro',
  },
];

const groupItems: DropdownOption[] = [
  { label: 'Room 402', value: 'room_402' },
  { label: 'Wirehouse', value: 'wirehouse' },
  { label: 'Garage', value: 'garage' },
];

const categoryItems: DropdownOption[] = [
  { label: 'Elektronik', value: 'elektronik' },
  { label: 'Transportasi', value: 'transportasi' },
  { label: 'Sanitasi', value: 'sanitasi' },
];

const brandItems: DropdownOption[] = [
  { label: 'Samsung', value: 'samsung' },
  { label: 'Hyundai', value: 'hyundai' },
  { label: 'Apple', value: 'apple' },
];

const modelTypeItems: DropdownOption[] = [
  { label: 'MacBook Pro', value: 'macbook_pro' },
  { label: 'Asus', value: 'asus' },
  { label: 'Ultra 24', value: 'ultra_24' },
];

const showForm = shallowRef<boolean>(false);
const selectedGroup = shallowRef<string>();
const selectedName = shallowRef<string>();
const selectedBrand = shallowRef<string>();
const text = shallowRef<string>('');

const formValues = ref<FormValue>();

// TODO: Function ini hapus aja
const openToast = (message: string): void => {
  toast.add({ message, severity: 'success' });
};
const resetValue = (): void => {
  selectedName.value = undefined;
  selectedGroup.value = undefined;
  selectedBrand.value = undefined;
  text.value = '';
};

const addValue = (): void => {
  if (props.asset) {
    selectedBrand.value = props.asset.brand;
    selectedGroup.value = props.asset.group;
    selectedName.value = props.asset.name;
    text.value = props.asset.aliasName;
  }
};
const apply = async (e: {
  formValues: FormValue & Asset;
  stayAfterSubmit: boolean;
}): Promise<void> => {
  try {
    // Make a selected group option retain its previous value after submission when the checkbox is active.
    formValues.value = e.formValues;
    selectedGroup.value = undefined;
    setTimeout(() => (selectedGroup.value = e.formValues.group), 0);

    // Create or update asset
    const assetData = {
      ...e.formValues,
    };

    // If there's an asset ID, update it, otherwise create a new asset
    if (props.asset?._id) {
      await AssetServices.editAsset(props.asset._id, assetData as Asset);
      // TODO: Tiap kalu mau buka toast, pake toast.add
      openToast('Asset has been updated successfully');
    } else {
      await AssetServices.createAsset(assetData as Asset);
      openToast('Asset has been registered successfully');
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <DialogForm
    v-model:visible="showForm"
    :buttons-template="['submit', 'cancel', 'clear']"
    :closable="false"
    :header="asset ? 'Edit Asset' : 'Register Asset'"
    @close="resetValue"
    @show="addValue"
    @submit="apply"
    severity="danger"
    show-stay-checkbox
    width="xlarge"
  >
    <template #fields>
      <div class="flex space-x-4 mb-4">
        <Dropdown
          id="group-dropdown"
          v-model="selectedGroup"
          :initial-value="props.asset?.group"
          :options="groupItems"
          v-bind="AssetDropdownProps"
          class="flex-1"
          field-name="group"
          label="Group"
          placeholder="Select group"
          validator-message="You must pick a group"
        />
        <Dropdown
          id="category-dropdown"
          :initial-value="props.asset?.category"
          :options="categoryItems"
          v-bind="AssetDropdownProps"
          class="flex-1"
          field-name="category"
          label="Category"
          placeholder="Select category"
          validator-message="You must pick a category"
        />
      </div>

      <div class="flex space-x-4 mb-4 items-center">
        <Dropdown
          id="name-dropdown"
          v-model="selectedName"
          :initial-value="props.asset?.name"
          :options="names"
          v-bind="AssetDropdownProps"
          class="flex-1"
          field-name="name"
          label="Name"
          placeholder="Select assets name"
          validator-message="You must pick a name"
        />
        <div class="flex flex-1 flex-col">
          <span v-tooltip.top="{ value: badgeTooltip, autoHide: false }">
            <p class="mb-1">
              Alias Name
              <span class="text-gray-400">(optional)</span>
            </p>
          </span>
          <InputText
            id="alias-name-input-text"
            :mandatory="false"
            :max-length="30"
            :model-value="props.asset?.aliasName"
            :v-model="text"
            :validator-message="{
              exceed: 'Max length is 30 characters',
            }"
            :value="text"
            field-name="aliasName"
            placeholder="Enter alias name"
            use-validator
          />
        </div>
      </div>

      <div class="flex space-x-4 mb-4">
        <Dropdown
          id="brand-dropdown"
          v-model="selectedBrand"
          :disabled="!selectedName"
          :initial-value="props.asset?.brand"
          :options="brandItems"
          v-bind="AssetDropdownProps"
          class="flex-1"
          field-name="brand"
          label="Brand"
          placeholder="Select brand"
          validator-message="You must pick a brand"
        />
        <Dropdown
          id="model-type-dropdown"
          :disabled="!selectedBrand"
          :initial-value="props.asset?.model"
          :options="modelTypeItems"
          v-bind="AssetDropdownProps"
          class="flex-1"
          field-name="model"
          label="Model/Type"
          placeholder="Select model/type"
          validator-message="You must pick a model/type"
        />
      </div>
      <ImageCompressor
        @apply="openToast('asset has been registered successfully')"
        field-name="assetImage"
        use-validator
      />
    </template>
  </DialogForm>
</template>
