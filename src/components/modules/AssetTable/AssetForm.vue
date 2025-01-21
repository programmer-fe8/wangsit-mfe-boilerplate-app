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

const badgeTooltip: string =
  'You can input an alias name for convenience in searching for assets\n' +
  'and to differentiate them from others';

const AssetDropdownProps: DropdownProps = {
  optionLabel: 'label',
  optionValue: 'value',
  useValidator: true,
  mandatory: true,
};

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
const imageHasChanges = shallowRef<boolean>(false);
const selectedGroup = shallowRef<string>();
const selectedName = shallowRef<string>();
const selectedBrand = shallowRef<string>();
const text = shallowRef<string>('');

const formValues = ref<FormValue>();

// Resets the form values to their initial state
const resetValue = (): void => {
  selectedName.value = undefined;
  selectedGroup.value = undefined;
  selectedBrand.value = undefined;
  text.value = '';
};

// Pre-fills the form with existing asset data if available
const addValue = (): void => {
  if (props.asset) {
    selectedBrand.value = props.asset.brand;
    selectedGroup.value = props.asset.group;
    selectedName.value = props.asset.name;
    text.value = props.asset.aliasName;
  }
};

// Handles form submission for creating or updating an asset
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

    // Check if the props asset has an _id property (indicating it's an edit)
    if (props.asset?._id) {
      try {
        // Check if the form has any changes
        let formHasChanges = false;
        const fieldsToCheck: (keyof Asset)[] = [
          'group',
          'category',
          'name',
          'aliasName',
          'brand',
          'model',
        ];

        for (const field of fieldsToCheck) {
          if (props.asset[field] !== assetData[field]) {
            formHasChanges = true;
          }
        }

        if (imageHasChanges.value) {
          formHasChanges = true;
        }

        // If the form has no changes, just show a toast message 'No changes detected.'
        if (!formHasChanges) {
          toast.add({
            severity: 'info',
            message: 'No changes detected.',
          });
          return;
        }

        // If the form has changes, update the asset
        await AssetServices.editAsset(props.asset._id, assetData as Asset);
        toast.add({
          severity: 'success',
          message: 'asset has been edited.',
        });
      } catch (error) {
        console.error(error);
        toast.add({
          error,
          message:
            'failed to edit asset. Please check your connection and try again.',
        });
      }
    } else {
      // If the props asset doesn't have an _id, it's a new asset
      try {
        await AssetServices.createAsset(assetData as Asset);
        toast.add({
          severity: 'success',
          message: 'asset has been registered.',
        });
      } catch (error) {
        console.error(error);
        toast.add({
          error,
          message:
            'failed to registered asset. Please check your connection and try again.',
        });
      }
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
    :clear-btn-label="props.asset ? 'Reset Field' : 'Clear Field'"
    :closable="false"
    :header="asset ? 'Edit Asset' : 'Register Asset'"
    :show-stay-checkbox="props.asset ? false : true"
    @close="resetValue"
    @show="addValue"
    @submit="apply"
    cancel-btn-label="Cancel"
    severity="danger"
    stay-checkbox-label="Stay on this after submiting"
    submit-btn-label="Create"
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
        :image-preview-url="props.asset?.assetImage"
        @update:default-image="imageHasChanges = true"
        field-name="assetImage"
      />
    </template>
  </DialogForm>
</template>
