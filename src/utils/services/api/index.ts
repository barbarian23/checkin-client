/*eslint no-param-reassign: "error"*/
import axios from 'axios';
import {t} from 'i18next';
import _ from 'lodash';
import Config from 'react-native-config';

import {queryClient} from '@/App';
import * as AsyncStorage from '@/utils/stores/AsyncStorage';

const axiosClient = axios.create({
  baseURL: Config.API_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(async (request: any) => {
  console.log(
    '%c Starting Request ',
    'background: #FFA813; color: #fff',
    request,
  );
  const authToken = await AsyncStorage.get('Token');
  if (authToken) {
    request.headers.common.Authorization = `Bearer ${authToken}`;
  }
  return request;
});

axiosClient.interceptors.response.use(
  response => {
    console.log('%c Response ', 'background: #69CA6D; color: #fff', response);
    const status = _.get(response, 'data.status', 200);
    if (status === 200) {
      return response;
    }
    return Promise.reject(response);
  },
  async (error: any) => {
    const response = _.get(error, 'response');
    console.log('%c Response ', 'background: #E41F00; color: #fff', response);
    const message = _.get(error, 'message');
    const status = _.get(response, 'status');
    if (!response?.data && message === 'Network Error') {
      if (message === 'Network Error') {
        global.props.showToast(t('message_network_error'));
        return;
      }
      return Promise.reject(response);
    }
    if (status === 401) {
      queryClient.setQueryData('isAuthenticated', false);
      AsyncStorage.set('Token', '');
    } else if (status === 500) {
      global.props.showToast(t('message_server_error'));
    }

    return Promise.reject(response);
  },
);

export const sendGet = async (url: string, params: any = {}) =>
  axiosClient.get(url, {params}).then(res => res?.data);

export const sendPost = async (url: string, params?: any, config: any = {}) =>
  axiosClient.post(url, params, config).then(res => res?.data);

export const sendPatch = async (url: string, params?: any, config: any = {}) =>
  axiosClient.patch(url, params, config).then(res => res?.data);

export const sendDelete = async (url: string, params: any = {}) =>
  axiosClient.delete(url, {params}).then(res => res?.data);

export default {
  sendGet,
  sendPost,
  sendPatch,
  sendDelete,
};
