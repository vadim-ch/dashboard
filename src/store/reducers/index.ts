import { combineReducers, Action } from 'redux';
import { DomainState, domainState } from './domain/index';
import { ApplicationState, applicationState } from './application';

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
  // if (action.type === 'logout') {
  //   state = initialState;
  // }

  return appReducers(state, action);
};
