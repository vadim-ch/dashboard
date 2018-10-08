export type AuthResponseType = {
  accessToken: string;
  refreshToken: string;
  firstName: string;
  lastName: string;
  id: string;
  email: string;
};

export const AuthPath = {
  Login: 'experts/login',
  Logout: 'experts/logout',
  Register: 'experts/register',
  RefreshToken: 'experts/refresh-token'
};
