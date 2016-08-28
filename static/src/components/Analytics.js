import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/auth';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

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
export default class Analytics extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='col-md-8'>
                <h1>Analytics</h1>
                <hr/>
            </div>
        );

    }
}
