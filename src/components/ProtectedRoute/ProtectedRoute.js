import Cookies from 'universal-cookie';
import React from 'react';
import { Route } from 'react-router-dom';
import NotFound from '../NotFound/NotFound.react';

const cookies = new Cookies();
export default function ProtectedRoute({ component: Component, ...rest }) {
  const isLoggedIn = !!cookies.get('loggedIn');
  return (
    <Route
      {...rest}
      render={props => (isLoggedIn ? <Component {...props} /> : <NotFound />)}
    />
  );
}
