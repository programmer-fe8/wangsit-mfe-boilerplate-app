import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getBaseURL } from '@/utils/getBaseURL.util';
import { ExamplePutBody } from '@/dto/example.dto';

const API = ({ headers = {}, params = {} } = {}): AxiosInstance => {
  const user = JSON.parse(localStorage.getItem('user') as string) ?? {};
  const BASE_URL = getBaseURL('APP_EXAMPLE_API');

  const instance = axios.create({
    baseURL: `${BASE_URL}/v2`,
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${user.token}`,
      ...headers,
    },
    params,
  });

  return instance;
};

const ExampleServices = {
  getData: (): Promise<AxiosResponse> => {
    return API().get('/');
  },

  putData: (body: ExamplePutBody): Promise<AxiosResponse> => {
    return API().put('/', body);
  },
};

export default ExampleServices;
