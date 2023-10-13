import { AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError) => {
  if (error.message === 'Network Error') {
    return Promise.reject(new Error('Connection error'));
  }

  if(error.response?.status === 401) {
    // Do nothing
  }

  return Promise.reject(error);


};