import { RequestAction, RequestStatus } from '../../../api/types';

export const apiMiddleware = store => next => async (action: RequestAction<any>) => {
  const dispatch = store.dispatch;
  if (action.request) {
    const {request: apiRequest} = action;
    apiRequest.request
        .then(response => next({
          ...action,
          payload: response,
          status: RequestStatus.Complete
        }))
        .catch(response => next({
          ...action,
          errors: response,
          status: RequestStatus.Error
        }));

    return next({
      ...action,
      status: RequestStatus.Pending
    });
  }
  return next(action);
};
