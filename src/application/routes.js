import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Layout from './components/layout';
import { routes } from './config/routes-config';
import PrivateRoute from './components/private-route';
import PublicOnlyRoute from './components/public-only-route';
import RoutesHanlder from '../common/components/routes-handler';

// Pages
import Dashboard from '../pages/dashboard';
import Plot from '../pages/plot';
import Profile from '../pages/profile';
import Register from '../pages/register';

const Routes = () => (
    <BrowserRouter>
        <Layout>
            <RoutesHanlder>
                <Route exact path={routes.dashboard.path} component={Dashboard} />
                <Route exact path={routes.plot.path} component={Plot} />
                <PublicOnlyRoute exact path={routes.register.path} component={Register} />
                <PrivateRoute exact path={routes.profile.path} component={Profile} />
            </RoutesHanlder>
        </Layout>
    </BrowserRouter>
);

export default Routes;
