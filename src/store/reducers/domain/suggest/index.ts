import { RequestState, RequestStatus } from '../../../../api/types';

const initialState = {
  approachesTherapy: [],
  errors: undefined,
  status: RequestStatus.Complete
};

export interface SuggestState extends RequestState {
  approachesTherapy: Array<any>;
}

export function suggest(
    state: SuggestState = initialState,
    action
): SuggestState {
  switch (action.type) {
    case '': {
      if (action.status === RequestStatus.Complete) {
        return {
          ...state,
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
