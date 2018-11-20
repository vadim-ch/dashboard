import { renderApp } from './render';
import { configureStore } from './store/';

const preloadedState = window['__PRELOADED_STATE__'];
delete window['__PRELOADED_STATE__'];

const { store, history } = configureStore('/', preloadedState);
renderApp(store, history);
