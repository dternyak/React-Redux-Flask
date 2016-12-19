import { RECEIVE_ISSUES, FETCH_ISSUES_REQUEST, UPDATE_STATUS_TEXT } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    issues: null,
    isFetching: false,
    loaded: false,
};

export default createReducer(initialState, {
    [RECEIVE_ISSUES]: (state, payload) =>
        Object.assign({}, state, {
            issues: payload.issues,
            isFetching: false,
            loaded: true,
        }),
    [FETCH_ISSUES_REQUEST]: (state, address) =>
        Object.assign({}, state, {
            isFetching: true,
            address,
        }),
    [UPDATE_STATUS_TEXT]: (state, text) =>
        Object.assign({}, state, {
            statusText: text,
        }),
});
