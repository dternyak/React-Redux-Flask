import { combineReducers } from 'redux';
import auth from './auth'
import {data} from './data'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
    routing: routerReducer,
    /* your reducers */
    auth,
    data
});

export default rootReducer;
