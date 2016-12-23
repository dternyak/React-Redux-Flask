import { RECEIVE_ISSUES, FETCH_ISSUES_REQUEST, UPDATE_STATUS_TEXT, TOGGLE_EXPAND_ISSUE } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    issues: null,
    isFetching: false,
    loaded: false,
    statusText: null,
};

export default createReducer(initialState, {
    [RECEIVE_ISSUES]: (state, payload) => {
        // Add 'expanded: false' to each issue.
        const issues = payload.issues.map(issue => Object.assign({}, issue, {
            expanded: false,
        }));

        return Object.assign({}, state, {
            issues: issues,
            isFetching: false,
            loaded: true,
        });
    },

    [FETCH_ISSUES_REQUEST]: (state, address) =>
        Object.assign({}, state, {
            isFetching: true,
            address,
        }),
    [UPDATE_STATUS_TEXT]: (state, text) =>
        Object.assign({}, state, {
            statusText: text,
        }),
    [TOGGLE_EXPAND_ISSUE]: (state, payload) => {
        // Neena logic FTW
        const issues = state.issues.map(issue => Object.assign({}, issue, {
            expanded: (issue.id === payload.id) && !issue.expanded,
        }));

        return Object.assign({}, state, {
            issues
        });
    },
});
