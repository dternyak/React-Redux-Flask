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
    marginTop: 50,
    paddingBottom: 50,
    paddingTop: 25,
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
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
            <div className="col-md-6 col-md-offset-3">
                <Paper style={style}>
                    <div className="text-center">
                        <h2>Hae bae!</h2>
                        {
                            this.props.statusText &&
                                <div className="alert alert-info">
                                    {this.props.statusText}
                                </div>
                        }

                        <div className="col-md-12">
                            <AddressSearchInput
                                fetchIssues={this.props.fetchIssues}
                            />
                        </div>
                    </div>
                </Paper>

            </div>
        );

    }
}

AddressView.propTypes = {
    fetchIssues: React.PropTypes.func,
    statusText: React.PropTypes.string,
};
