import { ActionCreator } from 'redux';
import { Logout, LogoutResponseType } from '../../../api/requests/auth/logout';
import { RequestAction } from '../../../api/types';

export const LOGOUT = 'logout';

export interface LogoutAction extends RequestAction<LogoutResponseType> {
  type: typeof LOGOUT;
  payload?: LogoutResponseType;
}

export const logout: ActionCreator<LogoutAction> = (): LogoutAction => {
  const request = new Logout();
  return {
    type: LOGOUT,
    request
  };
};
