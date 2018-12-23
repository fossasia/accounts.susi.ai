import Cookies from 'universal-cookie';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const cookies = new Cookies();
export default function PrivateRoute({ component: Component, ...rest }) {
  const isLoggedIn = !!cookies.get('loggedIn');
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '*',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
