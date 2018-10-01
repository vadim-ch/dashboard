import {ApiRequest, ApiRequestType} from '../index';
import { AuthPath, AuthResponseType } from './types';
import * as jwtDecode from 'jwt-decode';

export type RefreshTokenType = {
  refreshToken: string;
};

export interface RefreshTokenResponseType extends AuthResponseType {}

export class RefreshToken extends ApiRequest<RefreshTokenResponseType> {
  constructor(props: RefreshTokenType) {
    super(ApiRequestType.Post, AuthPath.RefreshToken, props);
  }

  public get request() {
    return super.request.then(response => {
      const {accessToken, refreshToken} = response;
      const {sub: id, email, username} = jwtDecode(accessToken);
      return {
        id,
        email,
        username,
        accessToken,
        refreshToken,
      }
    });
  }
}
