import { createSelector } from 'reselect';
import { State } from '../../index';
import {SuggestState} from './index';

export const getSuggest = (state: State): SuggestState => state.domainState.suggest;

export const getApproachesTherapyList = createSelector(
    [getSuggest],
    (suggest: SuggestState): Array<any> => {
      return suggest.approachesTherapy;
    }
);
