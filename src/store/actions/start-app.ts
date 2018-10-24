import { ActionCreator } from 'redux';

export const START_APP = 'start-app';

export type StartAppAction = {
  type: typeof START_APP;
  payload: {
    accessToken: string;
    refreshToken: string;
  }
};

export const startApp = (accessToken?: string, refreshToken?: string): StartAppAction => {
  return {
    type: START_APP,
    payload: {
      accessToken,
      refreshToken
    }
  };
};
