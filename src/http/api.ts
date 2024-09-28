import { api, setFormDataHeaders, setJSONDataHeaders } from './client';

//* Auth routes:
export const registerUser = async (data: any) => {
  setJSONDataHeaders();
  const response = await api.post('/auth/register-user', data);
  return response.data;
};

export const loginUser = async (data: any) => {
  setJSONDataHeaders();
  const response = await api.post('/auth/login-user', data);
  return response.data;
};
