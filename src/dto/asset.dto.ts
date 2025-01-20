export interface AssetQueryParams {
  search?: string;
  brand?: string[];
  group?: string[];
  name?: string[];
  model?: string[];
  page?: number;
  limit?: number;
  sortOrder?: 1 | -1;
  sortBy?: string;
  _id?: string;
}

export interface AssetOptionQueryParams {
  brandOptions?: boolean;
  nameOptions?: boolean;
  categoryOptions?: boolean;
  modelOptions?: boolean;
  groupOptions?: boolean;
}
