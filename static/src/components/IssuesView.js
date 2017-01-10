import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/data';

import IssueFeed from './IssueFeed';
import Loading from './Loading';

function mapStateToProps(state) {
    const {
        address,
        isFetching,
        issues,
        loaded,
        statusText,
        expandedIssueId,
    } = state.data;

    return {
        address,
        isFetching,
        issues,
        loaded,
        statusText,
        expandedIssueId,
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class IssuesView extends React.Component {
    componentDidMount() {
        let placeholderAddress = '1864 Fell St, San Francisco CA 94117';

        const {
            issues,
            fetchIssues,
            expandedIssueId,
        } = this.props;

        if (!issues) {
            fetchIssues(placeholderAddress);
        }

        // Scroll down to the expanded IssueCard.
        if (expandedIssueId) {
            // Push onto callback queue so it runs after the DOM is updated,
            // this is required when navigating from a different page so that
            // the element is rendered on the page before trying to getElementById.
            setTimeout(() => {
              const id = `issue_card_${expandedIssueId}`;
              const element = document.getElementById(id);
              if (element) element.scrollIntoView();
            }, 0);
        }
    }

    render() {
        const {
            issues,
            loaded,
            statusText,
            toggleExpandIssue,
            scrollInView,
            scrollOutOfView,
        } = this.props;

        return (
            <div>
                {!loaded
                    ? <Loading />
                    :
                    <div>
                        <IssueFeed
                            issues={issues}
                            toggleExpandIssue={toggleExpandIssue}
                            scrollInView={scrollInView}
                            scrollOutOfView={scrollOutOfView}
                        />
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
