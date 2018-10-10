import { createSelector } from 'reselect';
import { State } from '../../index';
import { AccountState } from './index';
import { RequestErrors, RequestStatus } from '../../../../api/types';

export const getAccount = (state: State): AccountState => state.domainState.account;

export const isAuthenticated = createSelector(
    [getAccount],
    (account: AccountState): boolean => {
      return Boolean(account.email);
    }
);

export const isAuthPending = createSelector(
    [getAccount],
    (account: AccountState): boolean => {
      return account.status === RequestStatus.Pending;
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
      return account.firstName ? account.firstName : account.email;
    }
);

export const getCurrentUserChars = createSelector(
    [getAccount],
    (account: AccountState): string => {
      return (account.firstName && account.lastName) ? `${account.firstName[0]}${account.lastName[0]}`.toUpperCase() : '';
    }
);

export const getCurrentUserId = createSelector(
    [getAccount],
    (account: AccountState): string => {
      return account.id;
    }
);