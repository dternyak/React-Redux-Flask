import React, { Component, PropTypes } from 'react';

/* component styles */
import { styles } from './styles.scss';

class IssueFeed extends Component {
  static propTypes = {
    issues: PropTypes.array.isRequired,
  }

  renderIssueCard(issue) {
    console.log('issue', issue);

    return (
      <div> ITEM {issue.description}</div>
    );
  }

  render() {
    let { issues } = this.props;

    return (
      <div className="container">
          <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  {issues.map(issue => this.renderIssueCard(issue))}
              </div>
          </div>
      </div>
    );
  }
}

export default IssueFeed;
