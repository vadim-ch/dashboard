import { createSelector } from 'reselect';
import { State } from '../../index';
import { AccountState } from './index';
import { RequestStatus } from '../../../../api/types';

export const getAccount = (state: State): AccountState => state.domainState.account;

export const isAuthenticated = createSelector(
    [getAccount],
    (account: AccountState): boolean => {
      return Boolean(account.userId && account.accessToken);
    }
);

export const isAuthPending = createSelector(
    [getAccount],
    (account: AccountState): boolean => {
      return account.status === RequestStatus.Pending;
    }
);

export const getAccessToken = createSelector(
    [getAccount],
    (account: AccountState): string => {
      return account.accessToken;
    }
);

export const getRefreshToken = createSelector(
    [getAccount],
    (account: AccountState): string => {
      return account.refreshToken;
    }
);

export const getCurrentUserId = createSelector(
    [getAccount],
    (account: AccountState): string => {
      return account.userId;
    }
);
