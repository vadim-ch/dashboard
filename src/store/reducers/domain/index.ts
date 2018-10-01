import { combineReducers } from 'redux';
import { AccountState, account } from './account/index';


export interface DomainState {
  account: AccountState;
}

export const domainState = combineReducers<DomainState>({
  account
});
