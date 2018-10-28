import { LOGIN, LoginAction } from '../../../actions/auth/login';
import { LOGOUT, LogoutAction } from '../../../actions/auth/logout';
import { REFRESH_TOKEN, RefreshTokenAction } from '../../../actions/auth/refresh-token';
import { RequestState, RequestStatus } from '../../../../api/types';
import { REGISTER, RegisterAction } from '../../../actions/auth/register';
import { GET_USER, GetUserAction } from '../../../actions/user/get-user-action';
import { START_APP, StartAppAction } from '../../../actions/start-app';
import { UPDATE_USER, UpdateUserAction } from '../../../actions/user/update-user-action';
import { GET_CURRENT_USER, GetCurrentUserAction } from '../../../actions/user/get-current-user-action';

const initialState = {
  userId: '',
  email: '',
  accessToken: '',
  refreshToken: '',
  errors: undefined,
  status: RequestStatus.Complete
};

export interface AccountState extends RequestState {
  userId: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export function account(
    state: AccountState = initialState,
    action:
        StartAppAction |
        LoginAction |
        RegisterAction |
        LogoutAction |
        RefreshTokenAction |
        GetUserAction |
        UpdateUserAction |
        GetCurrentUserAction
): AccountState {
  switch (action.type) {
    case REGISTER:
    case REFRESH_TOKEN:
    case LOGIN: {
      if (action.status === RequestStatus.Complete) {
        return {
          ...state,
          userId: action.payload.userId,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
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
    case GET_CURRENT_USER: {
      if (action.status === RequestStatus.Complete) {
        return {
          ...state,
          userId: action.payload.userId,
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
    // case START_APP: {
    //   const {accessToken, refreshToken} = action.payload;
    //   return {
    //     ...state,
    //     accessToken,
    //     refreshToken
    //   };
    // }
    // case LOGOUT: {
    //   if (action.status === RequestStatus.Complete) {
    //     return {
    //       ...state,
    //       ...initialState
    //     };
    //   }
    //   return state;
    // }
    default:
      return state;
  }
}
