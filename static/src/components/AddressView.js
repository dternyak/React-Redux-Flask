/* eslint camelcase: 0, no-underscore-dangle: 0 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import AddressSearchInput from './AddressSearchInput';

import * as actionCreators from '../actions/data';

import { get_issues } from '../utils/misc';

function mapStateToProps(state) {
    return {
        isFetching: state.data.isFetching,
        statusText: state.data.statusText,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const style = {
  h3: {
    //margin: 0
  }
};

@connect(mapStateToProps, mapDispatchToProps)
export default class AddressView extends React.Component {

    constructor(props) {
        super(props);
        const redirectRoute = '/login';
        this.state = {
            isFetching: false,
            statusText: null,
        };
    }

    render() {

        return (
            <div className="col-xs-12 text-center">
                <h3 style={style.h3}>Find your representatives</h3>
                {
                    this.props.statusText &&
                        <div className="alert alert-info">
                            {this.props.statusText}
                        </div>
                }
                <div className="">
                    <AddressSearchInput
                        fetchIssues={this.props.fetchIssues}
                    />
                </div>
            </div>
        );

    }
}

AddressView.propTypes = {
    fetchIssues: React.PropTypes.func,
    statusText: React.PropTypes.string,
};
