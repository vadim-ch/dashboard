import { ActionCreator } from 'redux';
import { RefreshToken, RefreshTokenResponseType } from '../../../api/requests/auth/refresh-token';
import { RequestAction } from '../../../api/types';

export const REFRESH_TOKEN = 'refresh-token';

export interface RefreshTokenAction extends RequestAction<RefreshTokenResponseType> {
  type: typeof REFRESH_TOKEN;
  payload?: RefreshTokenResponseType;
}

export const refreshToken: ActionCreator<RefreshTokenAction> = (
    refreshToken: string
): RefreshTokenAction => {
  const request = new RefreshToken({refreshToken});
  return {
    type: REFRESH_TOKEN,
    request
  };
};
