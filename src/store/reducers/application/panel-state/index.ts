import { RequestStatus } from '../../../../api/types';
import { GET_CURRENT_USER, GetCurrentUserAction } from '../../../actions/user/get-current-user-action';

export interface UiState {
  loading: boolean;
}

const initialState = {
  loading: true
};

export function uiState(
    state: UiState = initialState,
    action: GetCurrentUserAction
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
    default:
      return state;
  }
}
