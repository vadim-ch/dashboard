import { combineReducers } from 'redux';
import { UiState, uiState } from './ui-state';

export interface ApplicationState {
  uiState: UiState;
}

export const applicationState = combineReducers<ApplicationState>({
  uiState
});
