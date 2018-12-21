import { ActionCreator } from 'redux';
import { LoginResponseType } from '../../../api/requests/auth/login';
import { RequestAction } from '../../../api/types';
import { SendInvite } from '../../../api/requests/auth/send-invite';

export const SEND_INVITE = 'send-invite';

export interface EmailSigninAction extends RequestAction<LoginResponseType> {
  type: typeof SEND_INVITE;
}

export const sendInvite: ActionCreator<EmailSigninAction> = (
    email: string
): EmailSigninAction => {
  const request = new SendInvite({email});
  return {
    type: SEND_INVITE,
    request
  };
};
