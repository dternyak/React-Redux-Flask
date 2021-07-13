import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../actions/auth';
import * as optionActions from '../actions/option';
import { useComponentDidMount } from '../utils/lifecycle_hook';


export function DetermineAuth(Component) {
    const ret = (props) => {
        const dispatch = useDispatch();
        const loadIfNeeded = useSelector(state => state.option.loadIfNeeded)
        const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

        useComponentDidMount(() => {
            if (!isAuthenticated) {
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
                            dispatch(optionActions.setLoadIfNeeded(true));
                        }
                    });
                }
            }
            else {
                dispatch(optionActions.setLoadIfNeeded(true));
            }
        });


        return (
            <div>
                {loadIfNeeded
                    ? <Component {...props} />
                    : null
                }
            </div>
        );

    }

    return ret;

    // AuthenticatedComponent.propTypes = {
    //     loginUserSuccess: React.PropTypes.func,
    // };


}
