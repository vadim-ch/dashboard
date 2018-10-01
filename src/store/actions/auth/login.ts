import {ActionCreator} from 'redux';
import {Login, LoginResponseType} from '../../../api/requests/auth/login';
import { RequestAction } from '../../../api/types';

export const LOGIN = 'login';

export interface LoginAction extends RequestAction<LoginResponseType> {
  type: typeof LOGIN;
  payload?: LoginResponseType;
}

export const login: ActionCreator<LoginAction> = (
    email: string,
    password: string
): LoginAction => {
  const request = new Login({email, password});
  return {
    type: LOGIN,
    request
  };
};
