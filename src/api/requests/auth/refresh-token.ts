import {ApiRequest, ApiRequestType} from '../index';
import { AuthPath, AuthResponseType } from './types';
import * as jwtDecode from 'jwt-decode';
import { promiseMock, mockData } from '../mock';

export type RefreshTokenType = {
  refreshToken: string;
};

export interface RefreshTokenResponseType extends AuthResponseType {}

export class RefreshToken extends ApiRequest<RefreshTokenResponseType> {
  constructor(props: RefreshTokenType) {
    super(ApiRequestType.Post, AuthPath.RefreshToken, props);
  }

  // public get request(): Promise<RefreshTokenResponseType> {
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

  public get request(): Promise<RefreshTokenResponseType> {
    return promiseMock() as any;
  }
}
