import React, { Component } from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions/auth';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import LeftNav from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { routeActions } from 'react-router-redux'
import Divider from 'material-ui/Divider';
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

@connect(mapStateToProps, mapDispatchToProps)
export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }

    }

    dispatchNewRoute(route) {
        browserHistory.push(route)
        this.setState({
            open: false
        })

    }


    handleClickOutside(event) {
        this.setState({
            open: false
        })
    }


    logout(e) {
        e.preventDefault();
        this.props.logoutAndRedirect();
        this.setState({
            open: false
        })
    }

    openNav() {
        this.setState({
            open: true
        })
    }

    render() {
        return (
            <header>
                <LeftNav open={this.state.open}>
                    {
                        !this.props.isAuthenticated ?
                            <div>
                                <MenuItem onClick={() => this.dispatchNewRoute('/login')}>
                                    Login
                                </MenuItem>
                                <MenuItem onClick={() => this.dispatchNewRoute('/register')}>
                                    Register
                                </MenuItem>
                            </div>
                            :

                            <div>

                                <MenuItem onClick={(e) =>  this.dispatchNewRoute('/analytics')}>
                                    Analytics
                                </MenuItem>
                                <Divider />

                                <MenuItem onClick={(e) => this.logout(e)}>
                                    Logout
                                </MenuItem>
                            </div>
                    }
                </LeftNav>
                <AppBar
                    title="React-Redux-Flask"
                    onLeftIconButtonTouchTap={() => this.openNav()}
                    iconElementRight={

                    <FlatButton label="Home" onClick={() => this.dispatchNewRoute('/')} />
                    }
                />
            </header>

        );
    }
}
