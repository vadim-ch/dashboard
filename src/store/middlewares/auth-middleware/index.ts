import {REGISTER, RegisterAction} from '../../actions/auth/register';
import {LOGIN, LoginAction} from '../../actions/auth/login';
import {LogoutAction} from '../../actions/auth/logout';
import {START_APP, StartAppAction} from '../../actions/start-app';
import {RefreshTokenAction} from '../../actions/auth/refresh-token';
import {RequestStatus} from '../../../api/types';
import {RouteNames} from '../../../view/router';
import {push} from 'connected-react-router';
import {getCurrentUser} from '../../actions/user/get-current-user-action';

export const authMiddleware = store => next => async (
    action: LoginAction | StartAppAction | RegisterAction | LogoutAction | RefreshTokenAction
) => {
  const dispatch = store.dispatch;
  switch (action.type) {
    case START_APP: {
      dispatch(getCurrentUser());
      return next(action);
    }

      // case REFRESH_TOKEN: {
      //   const result = next(action);
      //   const currentRefreshToken = getRefreshToken(store.getState());
      //   // const {username, email, password} = action.payload;
      //   // const authData = await api.Auth.register(username, email, password);
      //   // const {user} = authData;
      //   try {
      //     const {accessToken, refreshToken} = await api.Auth.refreshToken(currentRefreshToken);
      //     dispatch(refreshTokenResponse(accessToken, refreshToken));
      //   } catch (e) {
      //     console.warn('Warning refresh token fail');
      //     dispatch(logout());
      //   }
      //   return result;
      // }
    case LOGIN:
    case REGISTER: {
      if (action.status === RequestStatus.Complete) {
        store.dispatch(push(RouteNames.Home));
      }
      return next(action);
    }
    default:
      return next(action);
  }
};
