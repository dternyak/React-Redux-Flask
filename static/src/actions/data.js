import {FETCH_PROTECTED_DATA_REQUEST, RECEIVE_PROTECTED_DATA} from '../constants/index'
import { checkHttpStatus, parseJSON } from '../utils/misc';

export function receiveProtectedData(data) {
    return {
        type: RECEIVE_PROTECTED_DATA,
        payload: {
            data: data
        }
    }
}

export function fetchProtectedDataRequest() {
    return {
        type: FETCH_PROTECTED_DATA_REQUEST
    }
}

export function fetchProtectedData(token) {
    return (dispatch) => {
        dispatch(fetchProtectedDataRequest());
        return fetch('api/user', {
            credentials: 'include',
            headers: {
                'Authorization': token
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveProtectedData(response.result));
            })
            .catch(error => {
                alert(error);
                if (error.response.status === 401) {
                    dispatch(logoutAndRedirect(error));
                }
            })
    }
}
