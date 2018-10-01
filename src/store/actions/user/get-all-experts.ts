import { ActionCreator } from 'redux';
import { RequestAction } from '../../../api/types';
import { GetAllExperts, GetAllExpertsResponseType } from '../../../api/requests/user/get-all-experts';

export const GET_ALL_EXPERTS = 'get-all-experts';

export interface GetAllExpertsAction extends RequestAction<GetAllExpertsResponseType> {
  type: typeof GET_ALL_EXPERTS;
  payload?: GetAllExpertsResponseType;
}

export const getAllExperts: ActionCreator<GetAllExpertsAction> = (): GetAllExpertsAction => {
  const request = new GetAllExperts();
  return {
    type: GET_ALL_EXPERTS,
    request
  };
};
