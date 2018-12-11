import { RequestAction, RequestErrors, RequestStatus } from '../../../api/types';
import axios from 'axios';
import { getAccessToken } from '../../reducers/domain/account/selectors';

const setAuthToken = (token: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const apiMiddleware = store => next => async (action: RequestAction<any>) => {
  const dispatch = store.dispatch;
  if (action.request) {
    const {request: apiRequest} = action;
    const accessToken = getAccessToken(store.getState());
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
    setAuthToken(accessToken);
    apiRequest.request
        .then(response => next({
          ...action,
          payload: response,
          status: RequestStatus.Complete
        }))
        .catch(error => {
          let errorData: RequestErrors = {};
          if (error.response) {
            // Запрос был сделан и сервер ответил кодом отличным от 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            errorData = error.response.data;
          } else if (error.request) {
            // Запрос был сделан, но ответ не получен
            // `error.request` is an instance of XMLHttpRequest in the browser
            console.log(error.request);
          } else {
            // Прочие ошибки
            console.log('Error', error.message);
            errorData = error.message;
          }
          return next({
            ...action,
            errors: errorData,
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
