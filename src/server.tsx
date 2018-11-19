import React from 'react';
import {renderToString} from 'react-dom/server';
import Express from 'express';
import {StaticRouter, matchPath} from 'react-router-dom';
import Root from './view';
import {configureStore} from './store';
import {html} from './html';

const port = 3080;
const app = Express()

app.use('/static', Express.static('static'));

app.use(handleRender);

// app.get('/', (req, res) => {
//
// });

function handleRender(req, res) {
  const store = configureStore();
  const context = {};
  const body = renderToString(
      <StaticRouter location={req.url} context={context}>
        <Root store={store}/>
      </StaticRouter>
  );
  const preloadedState = store.getState();
  res.send(html(body, preloadedState));
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
