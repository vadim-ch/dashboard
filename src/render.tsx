import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Store } from 'redux';
import Root from './view/index';

export function renderApp(store: Store<any>): void {
  const APP_NODE = document.getElementById('app');
  ReactDom.render(<Root store={store} />, APP_NODE);
  if (__DEV__ && module['hot']) {
    module['hot'].accept('./view/index', () => {
      const NextRoot = require('./view/index').default;
      ReactDom.render(<NextRoot store={store} />, APP_NODE);
    });
  }
}
