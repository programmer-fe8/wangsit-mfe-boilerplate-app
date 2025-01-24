export interface CustomFieldQueryParams {
  sortBy?: string;
  sortOrder?: number | 1 | -1;
  page?: number;
  limit?: number;
  active?: string[];
  datatype?: string[];
  required?: string[];
  search?: string;
  specific?: boolean | true | false;
}
