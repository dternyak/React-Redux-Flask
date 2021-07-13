import React, { Component } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import LeftNav from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

import * as authActions from '../../actions/auth';
import * as optionActions from '../../actions/option';

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated,
    };
}

export const Header = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sideBarOpen = useSelector((state) => (state.option.sideBarOpen));
    const isAuthenticated = useSelector((state) => (state.auth.isAuthenticated));

    const dispatchNewRoute = (route) => {
        dispatch(optionActions.setSideBarOpen(false));
        history.push(route);

    };

    const handleClickOutside = () => {
        dispatch(optionActions.setSideBarOpen(false));
    };

    const logout = (e) => {
        e.preventDefault();
        dispatch(authActions.logoutAndRedirect(history));
        dispatch(optionActions.setSideBarOpen(false));
    };

    const openNav = () => {
        dispatch(optionActions.setSideBarOpen(true));
    };


    return (
        <header>
            <LeftNav open={sideBarOpen}>
                {
                    !isAuthenticated ?
                        <div>
                            <MenuItem onClick={() => dispatchNewRoute('/login')}>
                                Login
                            </MenuItem>
                            <MenuItem onClick={() => dispatchNewRoute('/register')}>
                                Register
                            </MenuItem>
                        </div>
                        :
                        <div>
                            <MenuItem onClick={() => dispatchNewRoute('/analytics')}>
                                Analytics
                            </MenuItem>
                            <Divider />

                            <MenuItem onClick={(e) => logout(e)}>
                                Logout
                            </MenuItem>
                        </div>
                }
            </LeftNav>
            <AppBar
              title="React-Redux-Flask"
              onLeftIconButtonClick={() => openNav()}
              iconElementRight={
                  <FlatButton label="Home" onClick={() => dispatchNewRoute('/')} />
                }
            />
        </header>

    );


}
