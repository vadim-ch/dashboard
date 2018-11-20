import { createStore, applyMiddleware, Store, compose } from 'redux';
import { reducers, State } from './reducers';

export { State } from './reducers';
import { createHistory, createMemoryHistory} from 'history';
import { createLogger } from 'redux-logger';
import { localStorageMiddleware } from './middlewares/local-storage-middleware';
import { authMiddleware } from './middlewares/auth-middleware';
import { apiMiddleware } from './middlewares/api-middleware';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { requestNotificationsMiddleware } from './middlewares/request-notifications-middleware';

export const configureStore = (url: string = '/', initialState?: object): {store: Store<State>, history: any} => {
  const history = __SERVER__ ?
      createMemoryHistory({
        initialEntries: [url]
      }) :
      createHistory();

  let middlewares = [
    routerMiddleware(history),
    apiMiddleware,
    localStorageMiddleware,
    requestNotificationsMiddleware,
    authMiddleware
  ];

  if (__DEV__ && !__SERVER__) {
    middlewares = [...middlewares, createLogger()];
  }

  const store = createStore(
      connectRouter(history)(reducers),
      initialState,
      compose(
          applyMiddleware(...middlewares)
      )
  );

  return {
    store,
    history
  };
};
