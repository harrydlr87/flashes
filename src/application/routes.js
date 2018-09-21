import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/layout';
import { routes } from './config/routes-config';

// Pages
import Dashboard from '../pages/dashboard';
import Plot from '../pages/plot';

const Routes = () => (
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route exact path={routes.dashboard.path} component={Dashboard} />
                <Route exact path={routes.plot.path} component={Plot} />
            </Switch>
        </Layout>
    </BrowserRouter>
);

export default Routes;
