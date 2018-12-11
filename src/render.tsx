import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Store } from 'redux';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Root from './view/index';
import { State } from './store/reducers';

export function renderApp(store: Store<State>, history: any): void {

  const APP_NODE = document.getElementById('app');
  // ReactDom.render(<Root store={store} />, APP_NODE);
  // if (__DEV__ && module['hot']) {
  //   module['hot'].accept('./view/index', () => {
  //     const NextRoot = require('./view/index').default;
  //     ReactDom.render(<NextRoot store={store} />, APP_NODE);
  //   });
  // }

  hydrate((
      <BrowserRouter>
        <Root store={store} history={history}/>
      </BrowserRouter>
  ), APP_NODE);
}
