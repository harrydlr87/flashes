import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { routes } from '../../config/routes-config';
import { selectUser } from '../../store/reducer';

/** Component that creates a route only available for non logued users */
const PrivateRoute = ({ component: Component, user, ...props }) => (
  <Route
    {...props}
    render={props => (user
        ? <Redirect to={routes.dashboard.path} />
        : <Component {...props} />
    )}
  />
);

const mapStateToProps = state => ({
  user: selectUser(state),
});

export default connect(mapStateToProps)(PrivateRoute);
