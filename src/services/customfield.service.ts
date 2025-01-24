import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getBaseURL } from '@/utils/getBaseURL.util';
import { FetchResponse } from 'wangsvue/components/datatable/DataTable.vue';
import { CustomField } from '@/types/customfield.type';
import { CustomFieldQueryParams } from '@/dto/customfield.dto';

const API = ({ headers = {}, params = {} } = {}): AxiosInstance => {
  const user = JSON.parse(localStorage.getItem('user') ?? '{}');

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

const CustomFieldService = {
  getListCustomField: (
    params?: CustomFieldQueryParams,
  ): Promise<AxiosResponse<FetchResponse<CustomField>>> => {
    return API({ params }).get('/v2/settings/customfield');
  },
};

export default CustomFieldService;
