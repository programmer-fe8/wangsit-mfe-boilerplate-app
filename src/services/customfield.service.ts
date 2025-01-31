import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getBaseURL } from '@/utils/getBaseURL.util';
import { FetchResponse } from 'wangsvue/components/datatable/DataTable.vue';
import { CustomField } from '@/types/customfield.type';
import { CustomFieldQueryParams } from '@/dto/customfield.dto';
import { CustomFieldOptionQueryParams } from '@/dto/customfieldoption.dto';
import { FetchOptionResponse } from 'wangsvue/components/filtercontainer/FilterContainer.vue';

const API = ({ headers = {}, params = {} } = {}): AxiosInstance => {
  const user = JSON.parse(localStorage.getItem('user') ?? '{}');

  const BASE_URL = getBaseURL('APP_ASSETS_API');

  const instance = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
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
    return API({ params }).get('v2/settings/customfield');
  },

  getCustomFieldOptions: (
    params?: CustomFieldOptionQueryParams,
  ): Promise<AxiosResponse<FetchOptionResponse>> => {
    return API({ params }).get('v2/settings/options');
  },

  createCustomField: (
    params: { specific: boolean },
    data: CustomField,
  ): Promise<AxiosResponse> => {
    return API({ params }).post('v2/settings/customfield', data);
  },

  editCustomField: (id: string, data: CustomField): Promise<AxiosResponse> => {
    return API().put(`v2/settings/customfield/${id}`, data);
  },

  activateField: (fieldId: string[]): Promise<AxiosResponse> => {
    return API().patch('v2/settings/customfield/activate', {
      _id: fieldId,
    });
  },

  inactivateField: (fieldId: string[]): Promise<AxiosResponse> => {
    return API().patch('v2/settings/customfield/inactivate', { _id: fieldId });
  },
  deleteField: (fieldId: string[]): Promise<AxiosResponse> => {
    return API().delete('v2/settings/customfield', { data: { _id: fieldId } });
  },
};

export default CustomFieldService;
