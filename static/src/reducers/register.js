import { SET_REGISTER } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    email: '',
    password: '',
    emailErrorText: null,
    passwordErrorText: null,
    redirectTo: '/login',
    disabled: true,
};

export default createReducer(initialState, {
    [SET_REGISTER]: (state, payload) =>
        Object.assign({}, state, payload.data),
});
