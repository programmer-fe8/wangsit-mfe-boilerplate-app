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
}
