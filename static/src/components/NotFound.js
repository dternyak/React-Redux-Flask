import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/auth';
import { bindActionCreators } from 'redux';


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
export default class Settings extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className='col-md-8'>
                <h1>Not Found</h1>
            </div>
        );

    }
}

