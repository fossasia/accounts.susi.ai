import Cookies from 'universal-cookie';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const cookies = new Cookies();
export default function ProtectedRoute({ component: Component, ...rest }) {
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
              pathname: '/error-404',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
