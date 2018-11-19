import {ActionCreator} from 'redux';
import { LoginResponseType} from '../../../api/requests/auth/login';
import { RequestAction } from '../../../api/types';
import {EmailSignin} from "../../../api/requests/auth/email-signin";

export const EMAIL_SIGIN = 'email-signin';

export interface EmailSigninAction extends RequestAction<LoginResponseType> {
  type: typeof EMAIL_SIGIN;
  payload?: LoginResponseType;
}

export const emailSignin: ActionCreator<EmailSigninAction> = (
    token: string,
): EmailSigninAction => {
  const request = new EmailSignin({token});
  return {
    type: EMAIL_SIGIN,
    request
  };
};
