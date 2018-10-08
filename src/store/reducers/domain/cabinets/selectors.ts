import { createSelector } from 'reselect';
import { State } from '../../index';
import { CabinetsState } from './index';
import { RequestStatus } from '../../../../api/types';

export const getCabinets = (state: State): CabinetsState => state.domainState.cabinets;

export const isCabinetsPending = createSelector(
    [getCabinets],
    (account: CabinetsState): boolean => {
      return account.status === RequestStatus.Pending;
    }
);
