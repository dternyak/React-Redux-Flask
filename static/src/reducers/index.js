import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { items } from './items';
import {counter} from './counter'
import auth from './auth'
import {data} from './data'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
    routing: routerReducer,
    /* your reducers */
    counter: counter,
    auth,
    data,
    items,
});

export default rootReducer;
