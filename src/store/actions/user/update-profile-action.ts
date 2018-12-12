import { RequestAction } from '../../../api/types';
import { UpdateProfile, UpdateUserType } from '../../../api/requests/profile/update';
import { ProfileResponseType } from '../../../api/requests/profile/types';

export const UPDATE_PROFILE = 'update-profile';

export interface UpdateProfileAction extends RequestAction<ProfileResponseType> {
  type: typeof UPDATE_PROFILE;
  payload?: ProfileResponseType;
}

export const updateProfile = (
    id: string,
    data: UpdateUserType
): UpdateProfileAction => {
  const request = new UpdateProfile(data);
  return {
    type: UPDATE_PROFILE,
    request
  };
};
