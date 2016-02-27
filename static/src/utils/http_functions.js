import axios from 'axios';


export function get_token(username, password) {
    return axios.post('/api/test')
}

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