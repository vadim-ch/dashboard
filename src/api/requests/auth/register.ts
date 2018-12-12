import { ApiRequest, ApiRequestType } from '../index';
import { AuthPath, AuthResponseType } from './types';
import * as jwtDecode from 'jwt-decode';

export type RegisterType = {
  username: string;
  email: string;
  password: string;
};

export interface RegisterResponseType extends AuthResponseType {}

export class Register extends ApiRequest<RegisterResponseType>  {
  constructor(props: RegisterType) {
    super(ApiRequestType.Post, AuthPath.Register, props);
  }

  public get request(): Promise<RegisterResponseType> {
    return super.request.then(response => {
      const {accessToken, refreshToken, isPasswordExist} = response;
      const {sub: userId, email, profileId, role} = jwtDecode(accessToken);
      return {
        userId,
        email,
        profileId,
        role,
        isPasswordExist,
        accessToken,
        refreshToken
      };
    });
  }
}
