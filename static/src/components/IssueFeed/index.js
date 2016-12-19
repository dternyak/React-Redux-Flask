import React, { Component, PropTypes } from 'react';

import PageWrapper from '../PageWrapper';
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
      <PageWrapper />
    );
  }
}

export default IssueFeed;
