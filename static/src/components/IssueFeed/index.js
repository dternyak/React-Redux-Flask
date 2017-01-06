import React, { Component, PropTypes } from 'react';

import PageWrapper from '../PageWrapper';
import IssueCard from './IssueCard';

/* component styles */
import { styles } from './styles.scss';

class IssueFeed extends Component {
  static propTypes = {
    issues: PropTypes.array.isRequired,
    toggleExpandIssue: PropTypes.func.isRequired,
    scrollInView: React.PropTypes.func.isRequired,
    scrollOutOfView: React.PropTypes.func.isRequired,
  }

  render() {
    let {
      issues,
      toggleExpandIssue,
      scrollInView,
      scrollOutOfView,
    } = this.props;

    return (
      <div className="">
        <div className="row">
           <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
               {issues.map(issue =>
                 <IssueCard
                  key={issue.id}
                  issue={issue}
                  toggleExpandIssue={toggleExpandIssue}
                  scrollInView={scrollInView}
                  scrollOutOfView={scrollOutOfView}
                />
               )}
           </div>
        </div>
      </div>
    );
  }
}

export default IssueFeed;
