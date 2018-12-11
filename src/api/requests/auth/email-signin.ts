import { ApiRequest, ApiRequestType } from '../index';
import * as jwtDecode from 'jwt-decode';
import { AuthPath, AuthResponseType } from './types';

export type EmailSigninType = {
  token: string;
};

export interface LoginResponseType extends AuthResponseType {}

export class EmailSignin extends ApiRequest<LoginResponseType> {
  constructor(props: EmailSigninType) {
    super(ApiRequestType.Post, AuthPath.EmailSignin, props);
  }

  public get request(): Promise<LoginResponseType> {
    return super.request.then(response => {
      const {accessToken, refreshToken} = response;
      const decodedJwt = jwtDecode(accessToken);
      const {sub: userId, email, profileId, role} = decodedJwt as any;
      return {
        userId,
        profileId,
        email,
        role,
        accessToken,
        refreshToken
      };
    });
  }
}
