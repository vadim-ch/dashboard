import { START_APP, StartAppAction } from '../../../actions/start-app';
import { GET_USER, GetUserAction } from '../../../actions/user/get-user-action';
import { RequestStatus } from '../../../../api/types';

export interface UiState {
  loading: boolean;
}

const initialState = {
  loading: true
};

export function uiState(
    state: UiState = initialState,
    action: StartAppAction | GetUserAction
): UiState {
  switch (action.type) {
    case GET_USER:
      if (action.status === RequestStatus.Complete || action.status === RequestStatus.Error) {
        return {
          ...state,
          loading: false
        };
      }
      return state;
    case START_APP:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
