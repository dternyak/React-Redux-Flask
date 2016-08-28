import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import data from './data';

const rootReducer = combineReducers({
    routing: routerReducer,
    /* your reducers */
    auth,
    data,
});

export default rootReducer;
