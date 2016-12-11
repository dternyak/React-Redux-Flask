import React, { Component, PropTypes } from 'react';

import IssueCard from './IssueCard';

/* component styles */
import { styles } from './styles.scss';

class IssueFeed extends Component {
  static propTypes = {
    issues: PropTypes.array.isRequired,
  }

  render() {
    let { issues } = this.props;

    return (
      <div className="container">
          <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  {issues.map(issue =>
                    <IssueCard key={issue.description} issue={issue} />
                  )}
              </div>
          </div>
      </div>
    );
  }
}

export default IssueFeed;
