import {RequestStatus} from '../../../api/types';
import { UPDATE_USER, UpdateUserAction } from '../../actions/user/update-user-action';
import message from 'antd/lib/message';

export const requestNotificationsMiddleware = store => next => (action: UpdateUserAction) => {
  switch (action.type) {
    case UPDATE_USER: {
      if (action.status === RequestStatus.Complete) {
        message.success('Профиль сохранён');
      }
      return next(action);
    }
    default:
      return next(action);
  }
};
