import React from 'react';
import {connect} from 'react-redux';
import { routeActions } from 'react-router-redux'
import * as actionCreators from '../actions/auth';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
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
                this.props.redirectToRoute('/protected')

            } else {
                let token = localStorage.getItem('token');

                if (token !== null) {

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
                                this.props.loginUserSuccess(token)
                                this.props.redirectToRoute('/protected')

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
                    {this.props.isAuthenticated !== true && this.state.loaded
                        ? <Component {...this.props}/>
                        : null
                    }
                </div>
            )

        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(notAuthenticatedComponent);

}
