import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { LOGOUT, LogoutAction } from '../../actions/auth/logout';
import { START_APP, StartAppAction } from '../../actions/start-app';
import { LOGIN, LoginAction } from '../../actions/auth/login';
import { REFRESH_TOKEN, RefreshTokenAction } from '../../actions/auth/refresh-token';
import { RequestStatus } from '../../../api/types';
import { REGISTER, RegisterAction } from '../../actions/auth/register';
import {EMAIL_SIGIN, EmailSigninAction} from '../../actions/auth/email-signin';

const Token = {
  Access: 'at',
  Refresh: 'rt'
};

const setAuthToken = (token: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const localStorageMiddleware = store => next => (
    action:
        LoginAction |
        LogoutAction |
        RegisterAction |
        RefreshTokenAction |
        StartAppAction |
        EmailSigninAction
) => {
  const dispatch = store.dispatch;
  switch (action.type) {
    case START_APP: {
      action.payload.accessToken = window.localStorage.getItem(Token.Access);
      action.payload.refreshToken = window.localStorage.getItem(Token.Refresh);
      setAuthToken(action.payload.accessToken);
      return next(action);
    }
    case REGISTER:
    case REFRESH_TOKEN:
    case EMAIL_SIGIN:
    case LOGIN: {
      if (action.status === RequestStatus.Complete) {
        if (action.payload.accessToken) {
          window.localStorage.setItem(Token.Access, action.payload.accessToken);
          setAuthToken(action.payload.accessToken);
        }
        if (action.payload.refreshToken) {
          window.localStorage.setItem(Token.Refresh, action.payload.refreshToken);
        }
      }
      return next(action);
    }
    case LOGOUT: {
      if (action.status === RequestStatus.Complete) {
        window.localStorage.setItem(Token.Access, '');
        window.localStorage.setItem(Token.Refresh, '');
        setAuthToken('');
      }
      return next(action);
    }
    default:
      return next(action);
  }
};
