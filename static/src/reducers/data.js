import {
    RECEIVE_ISSUES,
    FETCH_ISSUES_REQUEST,
    UPDATE_STATUS_TEXT,
    TOGGLE_EXPAND_ISSUE,
    SCROLL_IN_VIEW,
    SCROLL_OUT_OF_VIEW,
    SET_EXPANDED_ISSUE_ID,
} from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    issues: null,
    isFetching: false,
    loaded: false,
    statusText: null,
    expandedIssueId: null,
};

export default createReducer(initialState, {
    [RECEIVE_ISSUES]: (state, payload) => {
        // Append `expanded` and `inView` to each issue.
        // Set `expanded` if specified by `expandedIssueId`
        const issues = payload.issues.map(issue => Object.assign({}, issue, {
            expanded: issue.id === state.expandedIssueId,
            inView: true,
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
    [SCROLL_IN_VIEW]: (state, payload) => {
        // Only set `inView: true` if issue id matches payload id
        const issues = state.issues.map(issue => Object.assign({}, issue, {
            inView: (issue.id === payload.id),
        }));

        return Object.assign({}, state, {
            issues
        });
    },
    [SCROLL_OUT_OF_VIEW]: (state, payload) => {
        // Only set `inView: true` if issue id is different from payload id and it's already true.
        const issues = state.issues.map(issue => Object.assign({}, issue, {
            inView: !(issue.id === payload.id) && issue.inView,
        }));

        return Object.assign({}, state, {
            issues
        });
    },
    [SET_EXPANDED_ISSUE_ID]: (state, payload) => {
        return Object.assign({}, state, {
            expandedIssueId: payload.id,
        });
    },
});
