import { SET_LOAD_IF_NEEDED, SET_SIDEBAR_OPEN } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    sideBarOpen: false,
    loadIfNeeded: false
};

export default createReducer(initialState, {
    [SET_SIDEBAR_OPEN]: (state, payload) =>
        Object.assign({}, state, {
            sideBarOpen: payload.data,
        }),
    [SET_LOAD_IF_NEEDED]: (state, payload) =>
        Object.assign({}, state, {
            test: true,
            loadIfNeeded: payload.data,
        }),
});
