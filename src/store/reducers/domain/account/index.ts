import { LOGIN, LoginAction } from '../../../actions/auth/login';
import { LogoutAction } from '../../../actions/auth/logout';
import { REFRESH_TOKEN, RefreshTokenAction } from '../../../actions/auth/refresh-token';
import { RequestState, RequestStatus } from '../../../../api/types';
import { REGISTER, RegisterAction } from '../../../actions/auth/register';
import { GetProfileAction } from '../../../actions/user/get-profile-action';
import { START_APP, StartAppAction } from '../../../actions/start-app';
import { UpdateProfileAction } from '../../../actions/user/update-profile-action';
import { GET_CURRENT_USER, GetCurrentUserAction } from '../../../actions/auth/get-current-user-action';
import { EMAIL_SIGIN, EmailSigninAction } from '../../../actions/auth/email-signin';

const initialState = {
  userId: '',
  email: '',
  profileId: '',
  accessToken: '',
  refreshToken: '',
  isPasswordExist: false,
  errors: undefined,
  status: RequestStatus.Complete
};

export interface AccountState extends RequestState {
  userId: string;
  email: string;
  profileId: string;
  accessToken: string;
  refreshToken: string;
  isPasswordExist: boolean;
}

export function account(
    state: AccountState = initialState,
    action:
        StartAppAction |
        LoginAction |
        RegisterAction |
        LogoutAction |
        RefreshTokenAction |
        GetProfileAction |
        UpdateProfileAction |
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
          profileId: action.payload.profileId,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          isPasswordExist: action.payload.isPasswordExist,
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
    case START_APP: {
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      };
    }
    case GET_CURRENT_USER: {
      if (action.status === RequestStatus.Complete) {
        return {
          ...state,
          userId: action.payload.userId,
          profileId: action.payload.profileId,
          isPasswordExist: action.payload.isPasswordExist
        };
      }
      return state;
    }
    default:
      return state;
  }
}
