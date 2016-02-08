import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/auth';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

import {validateEmail} from '../utils/misc'

function mapStateToProps(state) {
    return {
        isRegistering: state.auth.isRegistering,
        registerStatusText: state.auth.registerStatusText
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
};



@connect(mapStateToProps, mapDispatchToProps)
export default class Settings extends React.Component {

    constructor(props) {
        super(props);
        const redirectRoute = '/login';
        this.state = {
            email: '',
            password: '',
            email_error_text: null,
            password_error_text: null,
            redirectTo: redirectRoute,
            disabled: true
        };
    }

    render() {
        return (
            <div className='col-md-6 col-md-offset-3'>
               <h1>Settings</h1>
            </div>
        );

    }
}

