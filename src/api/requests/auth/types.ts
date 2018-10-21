export type AuthResponseType = {
  accessToken: string;
  refreshToken: string;
  firstName: string;
  lastName: string;
  id: string;
  email: string;
};

export const AuthPath = {
  Login: 'login',
  Logout: 'logout',
  Register: 'register/experts',
  RefreshToken: 'refresh-token'
};
