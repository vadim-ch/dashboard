import { ActionCreator } from 'redux';
import { RequestAction } from '../../../api/types';
import { GetCurrentUser, GetCurrentUserResponseType } from '../../../api/requests/auth/get-current';

export const GET_CURRENT_USER = 'get-current-user';

export interface GetCurrentUserAction extends RequestAction<GetCurrentUserResponseType> {
  type: typeof GET_CURRENT_USER;
  payload?: GetCurrentUserResponseType;
}

export const getCurrentUser: ActionCreator<GetCurrentUserAction> = (): GetCurrentUserAction => {
  const request = new GetCurrentUser();
  return {
    type: GET_CURRENT_USER,
    request
  };
};
