<script setup lang="ts">
/*
 * TODO: Seharusnya file ini direname jadi AssetForm dan dipindah ke folder AssetTable,
 * karena form ini bakal nambahin data ke AssetTable.
 * Referensi: Coding Style Guide bagian 6.1.2
 *
 * Selain itu, folder AssetTable juga seharusnya dipindah ke folder src/components/module.
 * Referensi: Coding Style Guide bagian 4.2 sama 4.3
 */
import { ref, shallowRef, computed } from 'vue';
import {
  DialogForm,
  Dropdown,
  InputText,
  ImageCompressor,
  Button,
  useToast,
} from 'wangsvue';

const showForm = shallowRef<boolean>(false);
const toast = useToast();
const openToast = (message: string): void => {
  toast.add({ message, severity: 'success' });
};

/*
 * TODO: Value dari text, selectedName, dan selectedBrand jangan string kosong,
 * undefined aja, jadi: const text = shallowRef<string>();
 */
const text = shallowRef('');

// TODO: Jangan pake ini, pake properti maxLength aja dari komponen InputText
const invalidState = computed(() => text.value?.length > 10);

/*
 * TODO: Semua ref di bawah ini ubah jadi constant
 * Kecuali selectedName sama selectedBrand, yang diubah jadi shallowRef
 * Semuanya juga ditambah tipe dalam kurung siku <>
 * Referensi: Coding Style Guide bagian 6.3.2 sama 6.3.3
 */
const names = ref([
  {
    label: 'MacBook Pro',
    value: 'macbook_pro',
  },
]);

const selectedName = ref('');

const groupItems = ref([
  { label: 'Room 402', value: 'room_402' },
  { label: 'Wirehouse', value: 'wirehouse' },
  { label: 'Garage', value: 'garage' },
]);

const categoryItems = ref([
  { label: 'Elektronik', value: 'elektronik' },
  { label: 'Transportasi', value: 'transportasi' },
  { label: 'Sanitasi', value: 'sanitasi' },
]);

const brandItems = ref([
  { label: 'Samsung', value: 'samsung' },
  { label: 'Hyundai', value: 'hyundai' },
  { label: 'Apple', value: 'apple' },
]);

const selectedBrand = ref('');

const modelTypeItems = ref([
  { label: 'MacBook Pro', value: 'macbook_pro' },
  { label: 'Asus', value: 'asus' },
  { label: 'Ultra 24', value: 'ultra_24' },
]);
</script>

<template>
  <Button @click="showForm = true" label="+ Register" severity="secondary" />
  <!-- TODO: Untuk reset value pas emit close, dibuat jadi fungsi aja, jangan taruh di template.
   Dan resetnya jangan jadi string kosong, jadi undefined aja, misal: selectedBrand.value = undefined -->
  <DialogForm
    v-model:visible="showForm"
    :buttons-template="['submit', 'cancel', 'clear']"
    :closable="false"
    @close="
      selectedBrand = '';
      selectedName = '';
    "
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
          class="flex-1"
          field-name="group"
          label="Group"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select group"
          use-validator
          validator-message="You must pick a group"
        />
        <Dropdown
          :options="categoryItems"
          class="flex-1"
          field-name="category"
          label="Category"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select category"
          use-validator
          validator-message="You must pick a category"
        />
      </div>

      <div class="flex space-x-4 mb-4 items-center">
        <Dropdown
          v-model="selectedName"
          :options="names"
          class="flex-1"
          field-name="name"
          label="Name"
          mandatory
          option-label="label"
          option-value="label"
          placeholder="Select assets name"
          use-validator
          validator-message="You must pick a name"
        />
        <div class="flex flex-1 flex-col">
          <p>Alias name <span class="text-xs">( optional )</span></p>
          <InputText
            :invalid="invalidState"
            :value="text"
            use-validator
            v-model:="text"
            validator-message="Max. 30 charcters"
          />
        </div>
      </div>

      <div class="flex space-x-4 mb-4">
        <Dropdown
          v-model="selectedBrand"
          :disabled="!selectedName"
          :options="brandItems"
          class="flex-1"
          field-name="brand"
          label="Brand"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select brand"
          use-validator
          validator-message="You must pick a brand"
        />
        <Dropdown
          :disabled="!selectedBrand"
          :options="modelTypeItems"
          class="flex-1"
          field-name="model_type"
          label="Model/Type"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select model/type"
          use-validator
          validator-message="You must pick a model/type"
        />
      </div>
      <ImageCompressor
        @apply="openToast('asset has been registered successfully')"
      />
    </template>
  </DialogForm>
</template>
