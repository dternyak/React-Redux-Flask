import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Router, Redirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/configureStore';
import routes from './routes';
import './style.scss';
import { App } from './containers/App';

// require('expose?$!expose?jQuery!jquery');
// require('bootstrap-webpack');

const store = configureStore();
const bh = createBrowserHistory();
const history = syncHistoryWithStore(bh, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App>
            {routes}
            </App>
        </Router>
    </Provider>,
    document.getElementById('root')
);
