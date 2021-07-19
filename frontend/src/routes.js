import React, { Suspense, lazy } from 'react';
import {
  Route, BrowserRouter as Router, Switch, Redirect,
} from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { useSelector, Provider } from 'react-redux';
import Store from './store';

const LoginPage = lazy(() => import('./Pages/Login'));
const SearchPage = lazy(() => import('./Pages/Search'));
const Repositories = lazy(() => import('./Pages/Repositories'));

function PrivateRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) => (isAuthenticated ? <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />)}
    />
  );
}

const Routes = () => (
  <Provider store={Store}>
    <Router>
      <Suspense fallback={(
        <div className="d-flex justify-content-center">
          <div className="centered">
            <CircularProgress color="secondary" size={50} />
          </div>
        </div>
              )}
      >
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <PrivateRoute path="/search" component={SearchPage} />
          <PrivateRoute path="/:user/repos" component={Repositories} />
        </Switch>
      </Suspense>
    </Router>
  </Provider>
);

export default Routes;
