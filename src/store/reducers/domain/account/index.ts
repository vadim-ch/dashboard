import { LOGIN, LoginAction } from '../../../actions/auth/login';
import { LogoutAction } from '../../../actions/auth/logout';
import { REFRESH_TOKEN, RefreshTokenAction } from '../../../actions/auth/refresh-token';
import { RequestState, RequestStatus } from '../../../../api/types';
import { REGISTER, RegisterAction } from '../../../actions/auth/register';
import { GetUserAction } from '../../../actions/user/get-user-action';
import { StartAppAction } from '../../../actions/start-app';
import { UpdateUserAction } from '../../../actions/user/update-user-action';
import { GET_CURRENT_USER, GetCurrentUserAction } from '../../../actions/user/get-current-user-action';
import {EMAIL_SIGIN, EmailSigninAction} from "../../../actions/auth/email-signin";

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
        GetCurrentUserAction |
        EmailSigninAction
): AccountState {
  switch (action.type) {
    case REGISTER:
    case REFRESH_TOKEN:
    case EMAIL_SIGIN:
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
    default:
      return state;
  }
}
