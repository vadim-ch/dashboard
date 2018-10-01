import {ActionCreator} from 'redux';
import { Register, RegisterResponseType } from '../../../api/requests/auth/register';
import { RequestAction } from '../../../api/types';

export const REGISTER = 'register';

export interface RegisterAction extends RequestAction<RegisterResponseType> {
  type: typeof REGISTER;
  payload?: RegisterResponseType;
}

export const register: ActionCreator<RegisterAction> = (
    username: string,
    email: string,
    password: string
): RegisterAction => {
  const request = new Register({username, email, password});
  return {
    type: REGISTER,
    request
  };
};
