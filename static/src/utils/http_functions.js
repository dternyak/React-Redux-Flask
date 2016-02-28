import axios from 'axios';

const tokenConfig = function (token) {
    return {
        headers: {
            'Authorization': token
        }
    }
};

export function validate_token(token) {
    return axios.post('/api/is_token_valid', {
        token: token,
    })
}

export function get_github_access() {
    window.open(
        '/github-login',
        '_blank' // <- This is what makes it open in a new window.
    );
}

export function create_user(email, password) {
    return axios.post('api/create_user', {
        email: email,
        password: password
    })
}

export function get_token(email, password) {
    return axios.post('api/get_token', {
        email: email,
        password: password
    })
}

export function has_github_token(token) {
    return axios.get('api/has_github_token', tokenConfig(token))
}

export function data_about_user(token) {
    return axios.get('api/user', tokenConfig(token))
}
