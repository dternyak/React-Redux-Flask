import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useComponentDidMount } from '../utils/lifecycle_hook';
import * as authActions from '../actions/auth';
import * as optionActions from '../actions/option';

export const requireAuthentication = (Component) => {
    
    const ret = (props) => {
        const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
        const loadIfNeeded = useSelector(state => state.option.loadIfNeeded);
        const dispatch = useDispatch();
        const history = useHistory();

        useComponentDidMount(() => {
            if (!isAuthenticated) {
                const token = localStorage.getItem('token');
                if (!token) {
                    history.push('/home');
                } else {
                    fetch('/api/is_token_valid', {
                        method: 'post',
                        credentials: 'include',
                        headers: {
                            'Accept': 'application/json', // eslint-disable-line quote-props
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token }),
                    })
                    .then(res => {
                        if (res.status === 200) {
                            dispatch(authActions.loginUserSuccess(token));
                            dispatch(optionActions.setLoadIfNeeded(true));
                        } else {
                            history.push('/home');
                        }
                    });
    
                }
            } else {
                dispatch(optionActions.setLoadIfNeeded(true));
            }
        })


        return (
            <div>
                {isAuthenticated && loadIfNeeded
                    ? <Component {...props} />
                    : null
                }
            </div>
        );

    }

    return ret;

    // AuthenticatedComponent.propTypes = {
    //     loginUserSuccess: React.PropTypes.func,
    //     isAuthenticated: React.PropTypes.bool,
    // };

}
