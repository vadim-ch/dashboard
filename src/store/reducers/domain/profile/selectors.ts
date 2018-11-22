import { createSelector } from 'reselect';
import { State } from '../../index';
import { ProfileState} from './index';

export const getProfile = (state: State): ProfileState => state.domainState.profile;

export const getCurrentUsername = createSelector(
    [getProfile],
    (profile: ProfileState): string => {
      return profile.firstName ? profile.firstName : profile.email;
    }
);

export const getCurrentUserChars = createSelector(
    [getProfile],
    (profile: ProfileState): string => {
      return (profile.firstName && profile.lastName) ?
          `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase() : '';
    }
);

export const getAvatarUrl = createSelector(
    [getProfile],
    (profile: ProfileState): string => {
      return `${STORAGE_URL}/avatars/${profile.avatar}`;
    }
);
