import {sendPost} from '.';

export const login = (params: any) => sendPost('login', params);

export const logout = () => sendPost('logout');
