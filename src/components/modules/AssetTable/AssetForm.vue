<script setup lang="ts">
/*
 * TODO: Seharusnya file ini direname jadi AssetForm dan dipindah ke folder AssetTable,
 * karena form ini bakal nambahin data ke AssetTable.
 * Referensi: Coding Style Guide bagian 6.1.2
 *
 * Selain itu, folder AssetTable juga seharusnya dipindah ke folder src/components/module.
 * Referensi: Coding Style Guide bagian 4.2 sama 4.3
 */
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

/*
 * TODO: Value dari text, selectedName, dan selectedBrand jangan string kosong,
 * undefined aja, jadi: const text = shallowRef<string>();
 */

// TODO: Jangan pake ini, pake properti maxLength aja dari komponen InputText

/*
 * TODO: Semua ref di bawah ini ubah jadi constant
 * Kecuali selectedName sama selectedBrand, yang diubah jadi shallowRef
 * Semuanya juga ditambah tipe dalam kurung siku <>
 * Referensi: Coding Style Guide bagian 6.3.2 sama 6.3.3
 */
</script>

<template>
  <Button @click="showForm = true" label="+ Register" severity="secondary" />
  <!-- TODO: Untuk reset value pas emit close, dibuat jadi fungsi aja, jangan taruh di template.
   Dan resetnya jangan jadi string kosong, jadi undefined aja, misal: selectedBrand.value = undefined -->
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
        <!-- TODO: Daripada di tiap dropdown ada properti option-label sama option-value,
        pake `v-bind="DropdownProps"` aja, terus buat constant DropdownProps yang isinya
        properti yang dipake semua Dropdown -->
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
          <p>Alias name <span class="text-xs">( optional )</span></p>
          <InputText
            :max-length="30"
            :validator-message="{
              exceed: 'Max length is 30 characters',
            }"
            :value="text"
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
