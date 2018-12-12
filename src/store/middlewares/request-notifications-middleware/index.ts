import {RequestStatus} from '../../../api/types';
import message from 'antd/lib/message';
import { UPDATE_PROFILE, UpdateProfileAction } from '../../actions/user/update-profile-action';

export const requestNotificationsMiddleware = store => next => (action: UpdateProfileAction) => {
  switch (action.type) {
    case UPDATE_PROFILE: {
      if (action.status === RequestStatus.Complete) {
        message.success('Профиль сохранён');
      }
      return next(action);
    }
    default:
      return next(action);
  }
};
