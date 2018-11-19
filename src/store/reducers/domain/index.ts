import {combineReducers} from 'redux';
import {AccountState, account} from './account/index';
import {CabinetsState, cabinets} from './cabinets';
import {ProfileState, profile} from './profile';
import {SuggestState, suggest} from './suggest';

export interface DomainState {
  account: AccountState;
  cabinets: CabinetsState;
  profile: ProfileState;
  suggest: SuggestState;
}

export const domainState = combineReducers<DomainState>({
  account,
  cabinets,
  profile,
  suggest
});
