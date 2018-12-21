export type AuthResponseType = {
  accessToken?: string;
  refreshToken?: string;
  // firstName?: string;
  // lastName?: string;
  // middleName?: string;
  userId: string;
  email: string;
  profileId: string;
  role: string;
  isPasswordExist: boolean;
};

export const AuthPath = {
  Login: 'login',
  EmailSignin: 'email-signin',
  EmailSigninRequest: 'email-signin-request',
  Logout: 'logout',
  Register: 'register/expert',
  RefreshToken: 'refresh-token',
  GetCurrent: 'current-user',
  PutAccount: 'account',
  SendInvite: 'send-invite'
};
