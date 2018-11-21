import { combineReducers, Action } from 'redux';
import { DomainState, domainState } from './domain';
import { ApplicationState, applicationState } from './application';
import { LOGOUT } from '../actions/auth/logout';
import { RequestStatus } from '../../api/types';

export interface State {
  domainState: DomainState;
  applicationState: ApplicationState;
}

const reducersMap = {
  domainState,
  applicationState
};

const appReducers = combineReducers<State>(reducersMap);

const initialState = appReducers({} as State, {} as Action);

export const reducers = (state, action) => {
  if (action.type === LOGOUT) {
    if (action.status === RequestStatus.Pending) {
      state = initialState;
    }
  }

  return appReducers(state, action);
};
