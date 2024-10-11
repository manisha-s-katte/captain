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

export const getTournaments = async (type: string) => {
  setJSONDataHeaders();
  const response = await api.get(`/tournament?type=${type}`);
  return response.data;
};

export const getSocialMediaPosts = async () => {
  setJSONDataHeaders();
  const response = await api.get('/social-media/get-all');
  return response.data;
};

export const getTournamentDetails = async (tournamentId: string) => {
  setJSONDataHeaders();
  const response = await api.get(`/tournament/details/${tournamentId}`);
  return response.data;
};

export const createTeam = async (data: any) => {
  setJSONDataHeaders();
  const response = await api.post('/tournament/create-team', data);
  return response.data;
};

export const getUserTeam = async (tournamentId: string) => {
  setJSONDataHeaders();
  const response = await api.get(`/tournament/user-team/${tournamentId}`);
  return response.data;
};

export const inviteTeamMate = async (data: any) => {
  setJSONDataHeaders();
  const response = await api.post('/tournament/invite-mate', data);
  return response.data;
};

export const respondToInvitation = async (data: any) => {
  setJSONDataHeaders();
  const response = await api.post('/tournament/respond-invitation', data);
  return response.data;
};

export const getNotifications = async () => {
  setJSONDataHeaders();
  const response = await api.get('/notifications');
  return response.data;
};

export const markNotificationsAsRead = async (notificationIds: number[]) => {
  setJSONDataHeaders();
  const response = await api.put('/notifications', { notificationIds });
  return response.data;
};
