/* eslint camelcase: 0, no-underscore-dangle: 0 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import * as authActions from '../actions/auth';
import * as registerActions from '../actions/register';

import { validateEmail } from '../utils/misc';
import { useHistory } from 'react-router';

const style = {
    marginTop: 50,
    paddingBottom: 50,
    paddingTop: 25,
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
};

const RegisterView = (props) => {
    console.log("register view");

    const state = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();

    const isDisabled = () => {
        let email_is_valid = false;
        let password_is_valid = false;

        if (state.email === '') {
            if(state.email_error_text!=null)
                dispatch(authActions.setAuth({
                    email_error_text: null,
                }));
        } else if (validateEmail(state.email)) {
            email_is_valid = true;
            if(state.email_error_text!=null)
                dispatch(authActions.setAuth({
                    email_error_text: null,
                }));
        } else {
            if(state.email_error_text==null)
                dispatch(authActions.setAuth({
                    email_error_text: 'Sorry, this is not a valid email',
                }));
        }

        if (state.password === '' || !state.password) {
            if(state.password_error_text!=null)
                dispatch(authActions.setAuth({
                    password_error_text: null,
                }));
        } else if (state.password.length >= 6) {
            password_is_valid = true;
            if(state.password_error_text!=null)
                dispatch(authActions.setAuth({
                    password_error_text: null,
                }));
        } else {
            if(state.password_error_text==null)
                dispatch(authActions.setAuth({
                    password_error_text: 'Your password must be at least 6 characters',
                }));
        }

        if (email_is_valid && password_is_valid) {
            if(state.disabled)
                dispatch(authActions.setAuth({
                disabled: false,
            }));
        }

    }

    const changeValue = (e, type) => {
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        dispatch(authActions.setAuth(next_state));
    }

    const register = (e) => {
        e.preventDefault();
        dispatch(authActions.registerUser(state.email, state.password, history));
    }

    const _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (!state.disabled) {
                register(e);
            }
        }
    }

    isDisabled();
    return (
        <div className="col-md-6 col-md-offset-3" onKeyPress={(e) => _handleKeyPress(e)}>
            <Paper style={style}>
                <div className="text-center">
                    <h2>Register to view protected content!</h2>
                    {
                        state.registerStatusText &&
                            <div className="alert alert-info">
                                {state.registerStatusText}
                            </div>
                    }

                    <div className="col-md-12">
                        <TextField
                            hintText="Email"
                            floatingLabelText="Email"
                            type="email"
                            errorText={state.email_error_text}
                            onChange={(e) => changeValue(e, 'email')}
                        />
                    </div>
                    <div className="col-md-12">
                        <TextField
                            hintText="Password"
                            floatingLabelText="Password"
                            type="password"
                            errorText={state.password_error_text}
                            onChange={(e) => changeValue(e, 'password')}
                        />
                    </div>

                    <RaisedButton
                        disabled={state.disabled}
                        style={{ marginTop: 50 }}
                        label="Submit"
                        onClick={(e) => register(e)}
                    />

                </div>
            </Paper>

        </div>
    );

}

export default RegisterView;
// RegisterView.propTypes = {
//     registerUser: React.PropTypes.func,
//     registerStatusText: React.PropTypes.string,
// };
