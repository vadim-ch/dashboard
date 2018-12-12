import { ActionCreator } from 'redux';
import { RequestAction } from '../../../api/types';
import { GetProfile } from '../../../api/requests/profile/get';
import { ProfileResponseType } from '../../../api/requests/profile/types';

export const GET_PROFILE = 'get-profile';

export interface GetProfileAction extends RequestAction<ProfileResponseType> {
  type: typeof GET_PROFILE;
  payload?: ProfileResponseType;
}

export const getProfile: ActionCreator<GetProfileAction> = (): GetProfileAction => {
  const request = new GetProfile();
  return {
    type: GET_PROFILE,
    request
  };
};
