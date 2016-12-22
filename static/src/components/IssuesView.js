import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/data';

import IssueFeed from './IssueFeed';

function mapStateToProps(state) {
    const { issues, isFetching, loaded } = state.data;

    return {
        issues,
        isFetching,
        loaded,
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
        const { issues, loaded } = this.props;

        return (
            <div>
                {!loaded
                    ? <h1>Loading data...</h1>
                    :
                    <div>
                        <IssueFeed issues={issues} />
                    </div>
                }
            </div>
        );
    }
}

IssuesView.propTypes = {
    fetchIssues: React.PropTypes.func,
    loaded: React.PropTypes.bool,
    isFetching: React.PropTypes.bool,
    issues: React.PropTypes.any,
};
