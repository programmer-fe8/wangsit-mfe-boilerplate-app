import { QueryParams } from 'wangsvue/components/datatable/DataTable.vue';

export interface GetUsersParams extends QueryParams {
  country?: string;
  minAge?: number;
  maxAge?: number;
}

export interface GetOptionsParams {
  country?: boolean;
}
