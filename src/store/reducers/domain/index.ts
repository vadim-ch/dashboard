import { combineReducers } from 'redux';
import { AccountState, account } from './account/index';
import { CabinetsState, cabinets } from './cabinets';

export interface DomainState {
  account: AccountState;
  cabinets: CabinetsState;
}

export const domainState = combineReducers<DomainState>({
  account,
  cabinets
});
