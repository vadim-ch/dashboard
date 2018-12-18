import { ActionCreator } from 'redux';
import { RequestAction } from '../../../api/types/index';
import { AuthResponseType } from '../../../api/requests/auth/types';
import { PutAccount } from '../../../api/requests/auth/put-account';

export const PUT_ACCOUNT_ACTION = 'put-account-action';

export interface PutAccountAction extends RequestAction<AuthResponseType> {
  type: typeof PUT_ACCOUNT_ACTION;
  payload?: AuthResponseType;
}

export const putAccountAction: ActionCreator<PutAccountAction> = (password: string): PutAccountAction => {
  const request = new PutAccount({password});
  return {
    type: PUT_ACCOUNT_ACTION,
    request
  };
};
