import { ActionCreator } from 'redux';
import { RequestAction } from '../../../api/types';
import { GetAllCabinets, GetAllCabinetsResponseType } from '../../../api/requests/cabinet/get-all-cabinets';

export const GET_ALL_EXPERTS = 'get-all-experts';

export interface GetAllExpertsAction extends RequestAction<GetAllCabinetsResponseType> {
  type: typeof GET_ALL_EXPERTS;
  payload?: GetAllCabinetsResponseType;
}

export const getAllCabinets: ActionCreator<GetAllExpertsAction> = (): GetAllExpertsAction => {
  const request = new GetAllCabinets();
  return {
    type: GET_ALL_EXPERTS,
    request
  };
};
