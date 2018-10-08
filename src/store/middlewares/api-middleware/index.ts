import { RequestAction, RequestStatus } from '../../../api/types';

export const apiMiddleware = store => next => async (action: RequestAction<any>) => {
  const dispatch = store.dispatch;
  if (action.request) {
    const {request: apiRequest} = action;
    // setTimeout(() => {
    //   apiRequest.request
    //       .then(response => next({
    //         ...action,
    //         payload: response,
    //         status: RequestStatus.Complete
    //       }))
    //       .catch(response => next({
    //         ...action,
    //         errors: response,
    //         status: RequestStatus.Error
    //       }));
    // }, 5000);
    apiRequest.request
        .then(response => next({
          ...action,
          payload: response,
          status: RequestStatus.Complete
        }))
        .catch(error => {
          if (error.response) {
            // Запрос был сделан и сервер ответил кодом отличным от 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // Запрос был сделан, но ответ не получен
            // `error.request` is an instance of XMLHttpRequest in the browser
            console.log(error.request);
          } else {
            // Прочие ошибки
            console.log('Error', error.message);
          }
          return next({
            ...action,
            errors: error,
            status: RequestStatus.Error
          });
        });

    return next({
      ...action,
      status: RequestStatus.Pending
    });
  }
  return next(action);
};
