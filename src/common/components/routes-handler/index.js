import React from 'react';
import { Switch, withRouter } from 'react-router-dom';

/** Component to enable remounting whenever the current route changes */
const RemountOnRouteChange = withRouter(({ location, children }) => (
  <div key={`${location.pathname}${location.search}`}>
    {children}
  </div>
));

const RoutesHandler = ({ children }) => (
  <RemountOnRouteChange>
    <Switch>
      {children}
    </Switch>
  </RemountOnRouteChange>
);


export default RoutesHandler;
