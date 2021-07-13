import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router';
import * as authActions from '../actions/auth';
import * as optionActions from '../actions/option';
import { useComponentDidMount } from '../utils/lifecycle_hook';


export function requireNoAuthentication(Component) {

    const ret = (props) => {
        const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
        const loadIfNeeded = useSelector(state => state.option.loadIfNeeded);
        const dispatch = useDispatch();

        useComponentDidMount(() => {
            if(isAuthenticated) {
                useHistory().push('/main');
            } 
            else {
                const token = localStorage.getItem('token');
                if (token) {
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
                            useHistory().push('/main');
                        } else {
                            dispatch(optionActions.setLoadIfNeeded(true));
                        }
                    });
                } 
                else {
                    dispatch(optionActions.setLoadIfNeeded(true));
                }
            }
    
        });

        return (
            <div>
                {!isAuthenticated && loadIfNeeded
                    ? <Component {...props} />
                    : null
                }
            </div>
        );
        
    }

    return ret;

    // notAuthenticatedComponent.propTypes = {
    //     loginUserSuccess: React.PropTypes.func,
    //     isAuthenticated: React.PropTypes.bool,
    // };


}
