import { ActionCreator } from 'redux';
import { LoginResponseType } from '../../../api/requests/auth/login';
import { RequestAction } from '../../../api/types';
import { GetUser, GetUserResponseType } from '../../../api/requests/user/get';

export const GET_USER = 'get-user';

export interface GetUserAction extends RequestAction<GetUserResponseType> {
  type: typeof GET_USER;
  payload?: GetUserResponseType;
}

export const getUser: ActionCreator<GetUserAction> = (
    id: string
): GetUserAction => {
  const request = new GetUser({id});
  return {
    type: GET_USER,
    request
  };
};
