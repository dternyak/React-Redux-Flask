/* eslint camelcase: 0 */

import axios from 'axios';

const DEFAULT_HEADER = {
    'Content-Type': 'application/json'
};

const tokenConfig = (token) => ({
    headers: Object.assign({}, DEFAULT_HEADER, {
        'Authorization': token, // eslint-disable-line quote-props
    }),
});


export function validate_token(token) {
    return axios.post('/api/is_token_valid', {
        token,
    });
}

export function get_github_access() {
    window.open(
        '/github-login',
        '_blank' // <- This is what makes it open in a new window.
    );
}

export function create_user(email, password) {
    return axios.post('/api/create_user', {
        email,
        password,
    }, DEFAULT_HEADER);
}

export function get_token(email, password) {
    return axios.post('/api/get_token', {
        email,
        password,
    }, DEFAULT_HEADER);
}

export function has_github_token(token) {
    return axios.get('/api/has_github_token', tokenConfig(token));
}

export function data_about_user(token) {
    return axios.get('/api/user', tokenConfig(token));
}
