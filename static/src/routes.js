import React from 'react';
import { Route } from 'react-router';

/* containers */
import { App } from 'containers/App';
import { HomeContainer } from 'containers/HomeContainer';
import LoginView from 'components/LoginView'
import RegisterView from 'components/RegisterView'
import Settings from 'components/Settings'
import Counter from 'components/Counter'
import ProtectedView from 'components/ProtectedView'
import Analytics from 'components/Analytics'

import {requireAuthentication} from 'components/AuthenticatedComponent';
import {requireNoAuthentication} from 'components/notAuthenticatedComponent';

export default (
    <Route path="/" component={App}>
        <Route path="home" component={requireNoAuthentication(HomeContainer)}/>
        <Route path="counter" component={requireAuthentication(Counter)}/>
        <Route path="login" component={requireNoAuthentication(LoginView)}/>
        <Route path="register" component={requireNoAuthentication(RegisterView)}/>
        <Route path="protected" component={requireAuthentication(ProtectedView)}/>
        <Route path="settings" component={requireAuthentication(Settings)}/>
        <Route path="analytics" component={requireAuthentication(Analytics)}/>

    </Route>
);
