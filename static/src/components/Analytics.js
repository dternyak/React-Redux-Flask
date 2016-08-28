import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/auth';

function mapStateToProps(state) {
    return {
        isRegistering: state.auth.isRegistering,
        registerStatusText: state.auth.registerStatusText,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const Analytics = connect(mapStateToProps, mapDispatchToProps)(
    <div className="col-md-8">
        <h1>Analytics</h1>
        <hr />
    </div>
);

export default Analytics;
