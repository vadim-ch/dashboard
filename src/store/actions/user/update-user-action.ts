import { ActionCreator } from 'redux';
import { LoginResponseType } from '../../../api/requests/auth/login';
import { RequestAction } from '../../../api/types';
import { UpdateUser, UpdateUserResponseType } from '../../../api/requests/user/update-expert-by-id';

export const UPDATE_USER = 'update-user';

export interface UpdateUserAction extends RequestAction<UpdateUserResponseType> {
  type: typeof UPDATE_USER;
  payload?: LoginResponseType;
}

export const updateUser: ActionCreator<UpdateUserAction> = (
    id: string,
    firstName: string,
    lastName: string
): UpdateUserAction => {
  const request = new UpdateUser({id, firstName, lastName});
  return {
    type: UPDATE_USER,
    request
  };
};
