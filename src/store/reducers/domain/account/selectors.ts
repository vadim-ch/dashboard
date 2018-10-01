import { createSelector } from 'reselect';
import { State } from '../../index';
import { AccountState } from './index';
import { RequestStatus } from '../../../../api/types';

export const getAccount = (state: State): AccountState => state.domainState.account;

export const isAuthenticated = createSelector(
    [getAccount],
    (account: AccountState): boolean => {
      return Boolean(account.email);
    }
);

export const isAuthLoaded = createSelector(
    [getAccount],
    (account: AccountState): boolean => {
      return account.status === RequestStatus.Complete;
    }
);

export const getRefreshToken = createSelector(
    [getAccount],
    (account: AccountState): string => {
      return account.refreshToken;
    }
);


export const getCurrentUsername = createSelector(
    [getAccount],
    (account: AccountState): string => {
      return account.username;
    }
);



export const getCurrentUserId = createSelector(
    [getAccount],
    (account: AccountState): string => {
      return account.id;
    }
);
