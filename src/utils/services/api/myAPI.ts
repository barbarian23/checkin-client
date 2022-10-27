import {sendGet, sendPost} from '@/utils/services/api';

export const checkPhone = (params: string) =>
  sendGet(`booking?number_phone=${params}`).then(res => res?.data);

export const getService = (params: string) =>
  sendGet(`combo/service?branch_code=${params}`).then(res => res?.data);

export const checkin = (params: any) =>
  sendPost('check-in/customer', params).then(res => res?.data);
