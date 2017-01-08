/* eslint camelcase: 0, no-underscore-dangle: 0 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {red100, red500, red700, blueA200, blueA400} from 'material-ui/styles/colors';
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

const styles = {
  ctaContainer: {
      marginTop: '10vh',
      marginBottom: '2vh',
      padding: '30px',
      paddingLeft: 'inherit',
      paddingRight: 'inherit',
  },
  ctaButton: {
      marginTop: '15px',
  },
  h3: {
    fontWeight: 400,
    margin: 0,
  },
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
            <Paper style={styles.ctaContainer} className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 text-center">
                <h3 style={styles.h3}>Find your representatives</h3>
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
                    <RaisedButton secondary={true} style={styles.ctaButton} label={'Get Started'} />
                </div>
            </Paper>
        );

    }
}

AddressView.propTypes = {
    fetchIssues: React.PropTypes.func,
    statusText: React.PropTypes.string,
};
