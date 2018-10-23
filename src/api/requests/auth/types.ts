export type AuthResponseType = {
  accessToken: string;
  refreshToken: string;
  firstName: string;
  lastName: string;
  avatar: string;
  id: string;
  email: string;
};

export const AuthPath = {
  Login: 'login',
  Logout: 'logout',
  Register: 'register/expert',
  RefreshToken: 'refresh-token'
};
