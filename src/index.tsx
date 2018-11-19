import { renderApp } from './render';
import { configureStore, store } from './store/index';

const preloadedState = window.['__PRELOADED_STATE__'];
delete window['__PRELOADED_STATE__'];

const store = configureStore(preloadedState);
renderApp(store);
