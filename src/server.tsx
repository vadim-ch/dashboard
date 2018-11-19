import React from 'react';
import { renderToString } from 'react-dom/server';
import Express from 'express';
import Root from './view';
import { configureStore } from './store';
import { html } from './html';

const port = 3080;
const app = Express()

app.use('/static', Express.static('static'));

app.use(handleRender);

app.get('/', (req, res) => {

});

function handleRender(req, res) {
  const store = configureStore();
  const body = renderToString(<Root store={store}/>);
  const preloadedState = store.getState();
  res.send(html(body, preloadedState));
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import { Provider } from 'react-redux';
// import configureStore from './redux/configureStore';
// import { default as Root } from './view';

// export function render(initialState): any {
//   // Model the initial state
//   const store = configureStore(initialState);
//   let content = renderToString(
//       <Root store={store}/>
//   );
//   const preloadedState = store.getState();
//   return {content, preloadedState};
// }
