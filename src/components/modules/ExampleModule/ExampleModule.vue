<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { User } from '@/types/user.type';
import { Badge, BadgeGroup, DataTable } from 'wangsvue';
import {
  FetchResponse,
  QueryParams,
  TableCellComponent,
  TableColumn,
} from 'wangsvue/components/datatable/DataTable.vue.d';
import { MenuItem } from 'wangsvue/components/menuitem';
import router from '@/router';
import UserServices from '@/services/example.service';
import DialogDeleteUser from './DialogDeleteUser/DialogDeleteUser.vue';
import ExampleModuleTableFilter from './ExampleModuleTableFilter.vue';
import ExampleModuleHeader from './ExampleModuleHeader.vue';
import ExampleModuleQuickFilter from './ExampleModuleQuickFilter.vue';

const selectedUser = shallowRef<User>();
const showDeleteUserDialog = shallowRef(false);

const singleAction: MenuItem[] = [
  {
    label: 'Detail',
    icon: 'checkbox-blank-circle',
    command: (): void => {
      router.push('/detail');
    },
  },
  {
    label: 'Delete User',
    icon: 'checkbox-blank-circle',
    danger: true,
    command: (): void => {
      showDeleteUserDialog.value = true;
    },
  },
];

const tableColumns = computed<TableColumn[]>(() => {
  return [
    {
      field: 'name',
      header: 'Name',
      sortable: true,
      reorderable: false,
      fixed: true,
      bodyComponent: (data: User): TableCellComponent => {
        return {
          component: Badge,
          props: {
            label: data.name,
          },
        };
      },
    },
    {
      field: 'age',
      header: 'Age',
      sortable: true,
    },
    {
      field: 'email',
      header: 'Email',
      sortable: true,
      fixed: true,
    },
    {
      field: 'address.country',
      header: 'Cuntry',
      sortable: true,
    },
    {
      field: 'address.city',
      header: 'City',
      sortable: true,
    },
    {
      field: 'address.street',
      header: 'Street',
      sortable: true,
    },
    {
      field: 'profile.interests',
      header: 'Interest',
      sortable: false,
      bodyComponent: (data: User): TableCellComponent => {
        return {
          component: BadgeGroup,
          props: {
            labels: data.profile.interests,
            limit: 2,
            headerLabel: 'Interest',
          },
        };
      },
    },
  ];
});

const getTableData = async (
  params: QueryParams,
): Promise<FetchResponse<User> | undefined> => {
  try {
    const { data } = await UserServices.getUsers(params);

    return data;
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <ExampleModuleHeader />
  <ExampleModuleTableFilter />
  <ExampleModuleQuickFilter />
  <DataTable
    :columns="tableColumns"
    :fetch-function="getTableData"
    :options="singleAction"
    @toggle-option="selectedUser = $event"
    data-key="_id"
    lazy
    table-name="user-list"
    use-option
    use-paginator
  />
  <DialogDeleteUser
    v-model:visible="showDeleteUserDialog"
    :list="selectedUser ? [selectedUser] : []"
    list-label="name"
  />
</template>
