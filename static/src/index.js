import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/lib/createHashHistory';
import { Provider } from 'react-redux';
import { Router, Redirect } from 'react-router';
import configureStore from './store/configureStore';
import routes from './routes';

import injectTapEventPlugin from 'react-tap-event-plugin';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
const history = createHistory();


const store = configureStore(history);


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Redirect from="/" to="home"/>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('root')
);
