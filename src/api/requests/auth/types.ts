export type AuthResponseType = {
  accessToken?: string;
  refreshToken?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  userId: string;
  email: string;
};

export const AuthPath = {
  Login: 'login',
  EmailSignin: 'email-signin',
  Logout: 'logout',
  Register: 'register/expert',
  RefreshToken: 'refresh-token',
  GetCurrent: 'current-user'
};
