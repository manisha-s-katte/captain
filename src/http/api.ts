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

export const joinTournament = async (data: any) => {
  setJSONDataHeaders();
  const response = await api.post('/tournament/join', data);
  return response.data;
};

export const getSocialMediaPosts = async () => {
  setJSONDataHeaders();
  const response = await api.get('/social-media/get-all');
  return response.data;
};
