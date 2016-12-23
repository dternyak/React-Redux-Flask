import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/data';

import IssueFeed from './IssueFeed';

function mapStateToProps(state) {
    const { address, isFetching, issues, loaded, statusText } = state.data;

    return {
        address,
        isFetching,
        issues,
        loaded,
        statusText,
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class IssuesView extends React.Component {
    componentDidMount() {
        let placeholderAddress = '1864 Fell St, San Francisco CA 94117';

        if (!this.props.issues) {
            this.props.fetchIssues(placeholderAddress);
        }
    }

    render() {
        const { issues, loaded, statusText, toggleExpandIssue } = this.props;

        return (
            <div>
                {!loaded
                    ? <h1>Loading data...</h1>
                    :
                    <div>
                        <IssueFeed issues={issues} toggleExpandIssue={toggleExpandIssue} />
                    </div>
                }
            </div>
        );
    }
}

IssuesView.propTypes = {
    address: React.PropTypes.object,
    fetchIssues: React.PropTypes.func,
    isFetching: React.PropTypes.bool,
    issues: React.PropTypes.any,
    loaded: React.PropTypes.bool,
    statusText: React.PropTypes.object,
};
