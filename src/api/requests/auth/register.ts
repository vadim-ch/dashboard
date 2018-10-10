import { ApiRequest, ApiRequestType } from '../index';
import { AuthPath, AuthResponseType } from './types';
import * as jwtDecode from 'jwt-decode';
import { promiseMock, mockData } from '../mock';

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

  // public get request(): Promise<RegisterResponseType> {
  //   return super.request.then(response => {
  //     const {accessToken, refreshToken} = response;
  //     const {sub: id, email, firstName, lastName} = jwtDecode(accessToken);
  //     return {
  //       id,
  //       email,
  //       firstName,
  //       lastName,
  //       accessToken,
  //       refreshToken
  //     };
  //   });
  // }

  public get request(): Promise<RegisterResponseType> {
    return promiseMock(false) as any;
  }
}
