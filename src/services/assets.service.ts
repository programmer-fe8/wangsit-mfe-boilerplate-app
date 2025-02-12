import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getBaseURL } from '@/utils/getBaseURL.util';
import { FetchResponse } from 'wangsvue/components/datatable/DataTable.vue';
import { FetchOptionResponse } from 'wangsvue/components/filtercontainer/FilterContainer.vue';
import { Asset } from '@/types/asset.type';
import { AssetQueryParams, AssetOptionQueryParams } from '@/dto/asset.dto';

const API = ({ headers = {}, params = {} } = {}): AxiosInstance => {
  const user = JSON.parse(localStorage.getItem('user') ?? '{}');

  if (!user.token) {
    console.error('Token tidak ditemukan');
  }

  const BASE_URL = getBaseURL('APP_ASSETS_API');

  const instance = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
      'Authorization': `Bearer ${user.token}`,
      ...headers,
    },
    params,
  });

  return instance;
};

const AssetServices = {
  getAssetsData: (
    params?: AssetQueryParams,
  ): Promise<AxiosResponse<FetchResponse<Asset>>> => {
    return API({ params }).get('/v2/assets');
  },

  getAssetOptions: (
    params?: AssetOptionQueryParams,
  ): Promise<AxiosResponse<FetchOptionResponse>> => {
    return API({ params }).get('/v2/assets/options');
  },

  createAsset: (data: Asset): Promise<AxiosResponse> => {
    return API().post('/v2/assets', data);
  },

  editAsset: (id: string, data: Asset): Promise<AxiosResponse> => {
    return API().put(`/v2/assets/${id}`, data);
  },
};

export default AssetServices;
