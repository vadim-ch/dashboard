import { RequestState, RequestStatus } from '../../../../api/types';
import { GET_ALL_EXPERTS, GetAllExpertsAction } from '../../../actions/user/get-all-experts';
import { GetAllCabinetsResponseType } from '../../../../api/requests/cabinet/get-all-cabinets';

const initialState = {
  list: [],
  errors: undefined,
  status: RequestStatus.Complete
};

export interface CabinetsState extends RequestState {
  list: GetAllCabinetsResponseType;
}

export function cabinets(
    state: CabinetsState = initialState,
    action: GetAllExpertsAction
): CabinetsState {
  switch (action.type) {
    case GET_ALL_EXPERTS: {
      if (action.status === RequestStatus.Complete) {
        return {
          ...state,
          list: action.payload,
          status: action.status
        };
      }
      if (action.status === RequestStatus.Pending) {
        return {
          ...state,
          status: action.status
        };
      }
      if (action.status === RequestStatus.Error) {
        return {
          ...state,
          status: action.status,
          errors: action.errors
        };
      }
      return state;
    }
    default:
      return state;
  }
}
