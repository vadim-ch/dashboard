import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import express, { Request, Response } from 'express';
import { StaticRouter, matchPath } from 'react-router-dom';
import { configureStore } from './store';
import { html } from './html';
import path from 'path';
import App from './view/containers/app';
import {Helmet} from 'react-helmet';
// import cors from 'cors';
import cookieParser from 'cookie-parser';
import { isAuthenticated, isAuthPending } from './store/reducers/domain/account/selectors';
import { getCurrentUser } from './store/actions/user/get-current-user-action';
import { startApp } from './store/actions';

const port = 3080;
const app = express();

// Use Nginx or Apache to serve static assets in production or remove the if() around the following
// lines to use the express.static middleware to serve assets for production (not recommended!)
if (process.env.NODE_ENV === 'development') {
  app.use('/dist', express.static('./public/dist'));
  app.use('/favicon.ico', (req, res) => {
    res.send('');
  });
}

// app.use(cors());
// app.use(bodyParser.json());
app.use(cookieParser());
const manifestPath = path.join('public', 'dist');

app.use(handleRender);

app.use((err, req, res, next) => {
  return res.status(404).json({
    status: 'error',
    message: err.message,
    stack:
    // print a nicer stack trace by splitting line breaks and making them array items
    process.env.NODE_ENV === 'development' &&
    (err.stack || '')
        .split('\n')
        .map(line => line.trim())
        .map(line => line.split(path.sep).join('/'))
        .map(line =>
            line.replace(
                process
                    .cwd()
                    .split(path.sep)
                    .join('/'),
                '.'
            )
        )
  });
});

function handleRender(req: Request, res: Response): void {
  const { store } = configureStore(req.url, {
    domainState: {
      account: {
        accessToken: req.cookies.at,
        refreshToken: req.cookies.rt
      }
    }
  });
  store.dispatch(startApp());
  const unsubscribe = store.subscribe(() => {
    if (!isAuthPending(store.getState())) {
      unsubscribe();
      const context = {};
      const body = renderToString(
          <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
              <App/>
            </StaticRouter>
          </Provider>
      );
      const preloadedState = store.getState();
      const helmet = Helmet.renderStatic();
      res.send(html(body, preloadedState, helmet));
    }
  });
}

app.listen(port, () => console.log(`App listening on port ${port}!`));
