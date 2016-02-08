import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS
} from '../constants/index'

import { checkHttpStatus, parseJSON } from '../utils/misc';
import { routeActions } from 'react-router-redux'
import jwtDecode from 'jwt-decode';



export function loginUserSuccess(token) {
    localStorage.setItem('token', token);
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            token: token
        }
    }
}


export function loginUserFailure(error) {
    localStorage.removeItem('token');
    return {
        type: LOGIN_USER_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    }
}

export function loginUserRequest() {
    return {
        type: LOGIN_USER_REQUEST
    }
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER
    }
}

export function logoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(logout());
        dispatch(routeActions.push('/'))
    }
}

export function redirectToRoute(route) {
    return (dispatch) => {
        dispatch(routeActions.push(route))
    }
}

export function loginUser(email, password, redirect = "/") {
    return function (dispatch) {
        dispatch(loginUserRequest());
        return fetch('api/get_token', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    let decoded = jwtDecode(response.token);
                    dispatch(loginUserSuccess(response.token));
                    dispatch(routeActions.push('/protected'))
                } catch (e) {
                    alert(e);
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error));
            })
    }
}


export function registerUserRequest() {
    return {
        type: REGISTER_USER_REQUEST
    }
}

export function registerUserSuccess(token) {
    localStorage.setItem('token', token);
    return {
        type: REGISTER_USER_SUCCESS,
        payload: {
            token: token
        }
    }
}

export function registerUserFailure(error) {
    localStorage.removeItem('token');
    return {
        type: REGISTER_USER_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    }
}

export function registerUser(email, password, redirect = "/") {
    return function (dispatch) {
        dispatch(registerUserRequest());
        return fetch('api/create_user', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    let decoded = jwtDecode(response.token);
                    dispatch(registerUserSuccess(response.token));
                    dispatch(routeActions.push('/protected'))
                } catch (e) {
                    alert(e)
                    console.log(e)
                    dispatch(registerUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(registerUserFailure(error));
            })
    }
}
