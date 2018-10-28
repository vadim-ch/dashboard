import { RequestStatus } from '../../../../api/types';
import { GET_CURRENT_USER, GetCurrentUserAction } from '../../../actions/user/get-current-user-action';
import {LOGOUT, LogoutAction} from '../../../actions/auth/logout';
import {START_APP, StartAppAction} from '../../../actions/start-app';

export interface UiState {
  loading: boolean;
}

const initialState = {
  loading: true
};

export function uiState(
    state: UiState = initialState,
    action: GetCurrentUserAction | LogoutAction | StartAppAction
): UiState {
  switch (action.type) {
    case GET_CURRENT_USER:
      if (action.status === RequestStatus.Complete || action.status === RequestStatus.Error) {
        return {
          ...state,
          loading: false
        };
      }
      return state;
    case LOGOUT:
      if (action.status === RequestStatus.Complete) {
        return {
          ...state,
          loading: false
        };
      }
      return state;
    case START_APP:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
