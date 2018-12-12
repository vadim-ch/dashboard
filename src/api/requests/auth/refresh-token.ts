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

  public get request(): Promise<RefreshTokenResponseType> {
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
