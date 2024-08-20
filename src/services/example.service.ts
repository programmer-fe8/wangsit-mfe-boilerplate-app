import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getBaseURL } from '@/utils/getBaseURL.util';
import { GetOptionsParams, GetUsersParams } from '@/dto/user.dto';
import { FetchResponse } from 'wangsvue/components/datatable/DataTable.vue';
import { User } from '@/types/user.type';
import { FetchOptionResponse } from 'wangsvue/components/filtercontainer/FilterContainer.vue';

type GetOptionsResponse = FetchOptionResponse<GetOptionsParams>;

const API = ({ headers = {}, params = {} } = {}): AxiosInstance => {
  const user = JSON.parse(localStorage.getItem('user') ?? '{}');
  const BASE_URL = getBaseURL('APP_WANGS_DUMMY_REST_API');

  const instance = axios.create({
    baseURL: `${BASE_URL}/user`,
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${user.token}`,
      ...headers,
    },
    params,
  });

  return instance;
};

const UserServices = {
  getUsers: (
    params: GetUsersParams,
  ): Promise<AxiosResponse<FetchResponse<User>>> => {
    return API({ params }).get('/');
  },

  getOptions: (
    params: GetOptionsParams,
  ): Promise<AxiosResponse<GetOptionsResponse>> => {
    return API({ params }).get('/options');
  },
};

export default UserServices;
