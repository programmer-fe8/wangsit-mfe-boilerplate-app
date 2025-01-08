<script setup lang="ts">
import { shallowRef } from 'vue';

import {
  DialogForm,
  Dropdown,
  InputText,
  ImageCompressor,
  Button,
  useToast,
} from 'wangsvue';

import { DropdownProps } from 'wangsvue/components/dropdown/Dropdown.vue';

const AssetDropdownProps: DropdownProps = {
  optionLabel: 'label',
  optionValue: 'value',
  useValidator: true,
  mandatory: true,
};

const toast = useToast();
const openToast = (message: string): void => {
  toast.add({ message, severity: 'success' });
};
const resetValue = (): void => {
  selectedName.value = undefined;
  selectedBrand.value = undefined;
};

const badgeTooltip =
  'You can input an alias name for convenience in searching for assets\n' +
  'and to differentiate them from others';

const names = [
  {
    label: 'MacBook Pro',
    value: 'macbook_pro',
  },
];

const groupItems = [
  { label: 'Room 402', value: 'room_402' },
  { label: 'Wirehouse', value: 'wirehouse' },
  { label: 'Garage', value: 'garage' },
];

const categoryItems = [
  { label: 'Elektronik', value: 'elektronik' },
  { label: 'Transportasi', value: 'transportasi' },
  { label: 'Sanitasi', value: 'sanitasi' },
];

const brandItems = [
  { label: 'Samsung', value: 'samsung' },
  { label: 'Hyundai', value: 'hyundai' },
  { label: 'Apple', value: 'apple' },
];

const modelTypeItems = [
  { label: 'MacBook Pro', value: 'macbook_pro' },
  { label: 'Asus', value: 'asus' },
  { label: 'Ultra 24', value: 'ultra_24' },
];

const selectedName = shallowRef<string>();
const selectedBrand = shallowRef<string>();

const showForm = shallowRef<boolean>(false);
const text = shallowRef<string>('');
</script>

<template>
  <Button @click="showForm = true" label="+ Register" severity="secondary" />
  <DialogForm
    v-model:visible="showForm"
    :buttons-template="['submit', 'cancel', 'clear']"
    :closable="false"
    @clear="resetValue"
    @close="resetValue"
    @submit="openToast('asset has been registered successfully')"
    header="Register Asset"
    severity="danger"
    show-stay-checkbox
    width="xlarge"
  >
    <template #fields>
      <div class="flex space-x-4 mb-4">
        <Dropdown
          :options="groupItems"
          v-bind="AssetDropdownProps"
          class="flex-1"
          field-name="group"
          label="Group"
          placeholder="Select group"
          validator-message="You must pick a group"
        />
        <Dropdown
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
          v-model="selectedName"
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
            :mandatory="false"
            :max-length="30"
            :validator-message="{
              exceed: 'Max length is 30 characters',
            }"
            :value="text"
            placeholder="Enter alias name"
            use-validator
            v-model:="text"
          />
        </div>
      </div>

      <div class="flex space-x-4 mb-4">
        <Dropdown
          v-model="selectedBrand"
          :disabled="!selectedName"
          :options="brandItems"
          v-bind="AssetDropdownProps"
          class="flex-1"
          field-name="brand"
          label="Brand"
          placeholder="Select brand"
          validator-message="You must pick a brand"
        />
        <Dropdown
          :disabled="!selectedBrand"
          :options="modelTypeItems"
          v-bind="AssetDropdownProps"
          class="flex-1"
          field-name="model_type"
          label="Model/Type"
          placeholder="Select model/type"
          validator-message="You must pick a model/type"
        />
      </div>
      <ImageCompressor
        @apply="openToast('asset has been registered successfully')"
      />
    </template>
  </DialogForm>
</template>
