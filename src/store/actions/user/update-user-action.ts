import { ActionCreator } from 'redux';
import { LoginResponseType } from '../../../api/requests/auth/login';
import { RequestAction } from '../../../api/types';
import { UpdateUser, UpdateUserResponseType, UpdateUserType } from '../../../api/requests/user/update';

export const UPDATE_USER = 'update-user';

export interface UpdateUserAction extends RequestAction<UpdateUserResponseType> {
  type: typeof UPDATE_USER;
  payload?: LoginResponseType;
}

export const updateUser = (
    data: UpdateUserType
): UpdateUserAction => {
  const request = new UpdateUser(data);
  return {
    type: UPDATE_USER,
    request
  };
};
