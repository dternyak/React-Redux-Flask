import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import data from './data';
import option from './option';
import register from './register';

const rootReducer = combineReducers({
    routing: routerReducer,
    /* your reducers */
    auth,
    data,
    option,
    register
});

export default rootReducer;
