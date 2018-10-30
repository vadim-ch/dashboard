import { createStore, applyMiddleware, Store, compose, combineReducers } from 'redux';
import { reducers, State } from './reducers';
export { State } from './reducers';
import createHistory from 'history/createBrowserHistory';
import { createLogger } from 'redux-logger';
import { localStorageMiddleware } from './middlewares/local-storage-middleware';
import { authMiddleware } from './middlewares/auth-middleware';
import { apiMiddleware } from './middlewares/api-middleware';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { requestNotificationsMiddleware } from './middlewares/request-notifications-middleware';

export const history = createHistory();

let middlewares = [
  routerMiddleware(history),
  apiMiddleware,
  localStorageMiddleware,
  requestNotificationsMiddleware,
  authMiddleware
];

if (__DEV__) {
  middlewares = [...middlewares, createLogger()];
}

export const store: Store<State> = createStore(
    connectRouter(history)(reducers),
    compose(
      applyMiddleware(...middlewares)
    )
);
