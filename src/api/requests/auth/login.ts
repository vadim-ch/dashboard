import { ApiRequest, ApiRequestType } from '../index';
import * as jwtDecode from 'jwt-decode';
import { AuthPath, AuthResponseType } from './types';

export type LoginType = {
  email: string;
  password: string;
};

export interface LoginResponseType extends AuthResponseType {}

export class Login extends ApiRequest<LoginResponseType> {
  constructor(props: LoginType) {
    super(ApiRequestType.Post, AuthPath.Login, props);
  }

  public get request(): Promise<LoginResponseType> {
    return super.request.then(response => {
      const {accessToken, refreshToken} = response;
      const {sub: id, email, firstName, lastName, middleName} = jwtDecode(accessToken);
      return {
        userId: id,
        email,
        firstName,
        lastName,
        middleName,
        accessToken,
        refreshToken
      };
    });
  }
}
