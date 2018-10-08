import * as React from 'react';
import { RouteNames } from './';
import { Route, Switch, Redirect } from 'react-router-dom';

export const privateRoute = (Component, params, isAuthenticated): JSX.Element => {
  return (
      <Route
          {...params}
          render={props =>
              isAuthenticated ? (
                  <Component {...props} />
              ) : (
                  <Redirect
                      to={{
                        pathname: RouteNames.Login,
                        state: {from: props.location}
                      }}
                  />
              )
          }
      />);
};
