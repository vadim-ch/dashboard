import {ActionCreator} from 'redux';
import { RequestAction } from '../../../api/types';
import { EmailSigninRequest } from '../../../api/requests/auth/email-signin-request';

export const EMAIL_SIGNIN_REQUEST = 'email-signin-request';

export interface EmailSigninRequestAction extends RequestAction<any> {
  type: typeof EMAIL_SIGNIN_REQUEST;
}

export const emailSigninRequest: ActionCreator<EmailSigninRequestAction> = (
    email: string
): EmailSigninRequestAction => {
  const request = new EmailSigninRequest({email});
  return {
    type: EMAIL_SIGNIN_REQUEST,
    request
  };
};
