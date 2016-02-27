import React from 'react';
import {connect} from 'react-redux';
import { routeActions } from 'react-router-redux'
import * as actionCreators from '../actions/auth';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router'

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
};


export function requireNoAuthentication(Component) {

    class notAuthenticatedComponent extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                loaded: false
            }
        }

        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps);
        }

        checkAuth(props = this.props) {
            if (props.isAuthenticated) {
                browserHistory.push('/main')

            } else {
                let token = localStorage.getItem('token');
                if (token) {
                    return fetch('api/is_token_valid', {
                        method: 'post',
                        credentials: 'include',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({token: token})
                    })
                        .then(res => {
                            if (res.status === 200) {
                                this.props.loginUserSuccess(token);
                                browserHistory.push('/main')

                            } else {
                                this.setState({
                                    loaded: true
                                })
                            }
                        })
                } else {
                    this.setState({
                        loaded: true
                    })
                }
            }
        }

        render() {
            return (
                <div>
                    {!this.props.isAuthenticated && this.state.loaded
                        ? <Component {...this.props}/>
                        : null
                    }
                </div>
            )

        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(notAuthenticatedComponent);

}
