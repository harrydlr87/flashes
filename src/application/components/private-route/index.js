import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { routes } from '../../config/routes-config';
import { selectUser } from '../../store/reducer';

/** Component that creates a private route redirecting to homepage if the user has no access */
const PrivateRoute = ({ component: Component, user, ...props }) => (
  <Route
    {...props}
    render={props => (user
        ? <Component {...props} />
        : <Redirect to={routes.dashboard.path} />
    )}
  />
);

const mapStateToProps = state => ({
  user: selectUser(state),
});

export default connect(mapStateToProps)(PrivateRoute);
