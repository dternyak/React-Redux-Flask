import {
    FETCH_ISSUES_REQUEST,
    RECEIVE_ISSUES,
    UPDATE_STATUS_TEXT,
    TOGGLE_EXPAND_ISSUE,
} from '../constants/index';
import { parseJSON } from '../utils/misc';
import { data_about_user, get_issues } from '../utils/http_functions';
import { browserHistory } from 'react-router';

export function receiveIssues(res) {
    return {
        type: RECEIVE_ISSUES,
        payload: {
            issues: res,
            isFetching: false,
            loaded: true,
        },
    };
}
export function fetchIssuesRequest(address) {
    return {
        type: FETCH_ISSUES_REQUEST,
        payload: {
            address,
        },
    };
}

export function updateStatusText(text) {
    return {
        type: UPDATE_STATUS_TEXT,
        payload: {
            text,
        },
    };
}

export function fetchIssues(address) {
    return (dispatch) => {
        dispatch(fetchIssuesRequest(address));
        get_issues(address)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveIssues(response.result));
                // TODO(SBH): create another function `submitAddress` which wraps `fetchIssues` and redirects (as below):
                browserHistory.push('/issues');
            })
            .catch(error => {
                dispatch(updateStatusText(error));
            });
    };
}

export function toggleExpandIssue(id) {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_EXPAND_ISSUE,
            payload: {
                id,
            },
        });
    };
}
// export function fetchIssuesData() {
//     return (dispatch) => {
//         get_issues()
//             .then(parseJSON)
//             .then(response => {
//                 dispatch(receiveIssues(response.result));
//             });
//     };
// }
