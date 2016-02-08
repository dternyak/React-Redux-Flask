import {createReducer} from '../utils/misc';
import {RECEIVE_PROTECTED_DATA, FETCH_PROTECTED_DATA_REQUEST} from '../actions/data';

const initialState = {
    data: null,
    isFetching: false,
    loaded: false
};

export function data(state = initialState, action) {
    switch (action.type) {
        case 'RECEIVE_PROTECTED_DATA':
            return Object.assign({}, state, {
                'data': action.payload.data,
                'isFetching': false,
                'loaded': true
            });
        case 'FETCH_PROTECTED_DATA_REQUEST':
            return Object.assign({}, state, {
                'isFetching': true
            });

        default:
            return state
    }
}
