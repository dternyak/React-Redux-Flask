/* eslint new-cap: 0 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* containers */
import { App } from './containers/App';
import { HomeContainer } from './containers/HomeContainer';
import { HealthcareHomeContainer } from './containers/HealthcareHomeContainer';
import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView';
import { IssuesContainer } from './containers/IssuesContainer';
import IssuesView from './components/IssuesView';
import Analytics from './components/Analytics';
import NotFound from './components/NotFound';

import { DetermineAuth } from './components/DetermineAuth';
import { requireAuthentication } from './components/AuthenticatedComponent';
import { requireNoAuthentication } from './components/notAuthenticatedComponent';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomeContainer} />
    <Route path="healthcare" component={HealthcareHomeContainer} />
    <Route path="issues" component={IssuesContainer} />
    <Route path="*" component={DetermineAuth(NotFound)} />
  </Route>
);
