import { RequestAction } from '../../../api/types';
import { UpdateUser, UpdateUserResponseType, UpdateUserType } from '../../../api/requests/user/update';

export const UPDATE_USER = 'update-user';

export interface UpdateUserAction extends RequestAction<UpdateUserResponseType> {
  type: typeof UPDATE_USER;
  payload?: UpdateUserResponseType;
}

export const updateUser = (
    id: string,
    data: UpdateUserType
): UpdateUserAction => {
  const request = new UpdateUser(id, data);
  return {
    type: UPDATE_USER,
    request
  };
};
