import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { items } from './items';
import {counter} from './counter'
import auth from './auth'
import {data} from './data'
import { routeReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    form: formReducer,
    routing: routeReducer,
    /* your reducers */
    counter: counter,
    auth,
    data,
    items,
});

export default rootReducer;
