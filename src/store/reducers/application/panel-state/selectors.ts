import { createSelector } from 'reselect';
import { State } from '../../index';
import { UiState } from './index';

export const getUiState = (state: State): UiState => state.applicationState.uiState;

export const isAppLoaded = createSelector(
    [getUiState],
    (uiState: UiState): boolean => {
      return !uiState.loading;
    }
);
