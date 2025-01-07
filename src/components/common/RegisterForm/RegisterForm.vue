<script setup lang="ts">
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
const openToast = (message: string, isError?: boolean): void => {
  toast.add({ message, error: isError, life: 0 });
};

const text = shallowRef('');

const invalidState = computed(() => text.value?.length > 10);

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
