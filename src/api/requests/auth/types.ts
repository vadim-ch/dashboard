export type AuthResponseType = {
  accessToken: string;
  refreshToken: string;
  username: string;
  id: string;
  email: string;
};

export const AuthPath = {
  Login: 'experts/login',
  Logout: 'experts/logout',
  Register: 'experts/register',
  RefreshToken: 'experts/refresh-token'
};
