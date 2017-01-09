import React from 'react';
import pluralize from 'pluralize';
import { timeRemaining } from '../../utils/misc';

export default class TimeRemaining extends React.Component {

  render() {
    const {issue} = this.props;
    const timeObject = timeRemaining(Date.parse(issue.due_date));
    const styles = {
      timeRemaining: {
        fontSize: '14px',
        fontWeight: 'normal',
        display: 'inline',
        color: timeObject.days < 7 ? 'red' : 'white',
      },
    }

    // E.g. {years: 1, months: 0, days: 3} => ["1 year", "3 days"]
    let timeArray = Object.keys(timeObject).map(
      (key) => {
        const count = timeObject[key];

        if (count) {
          return `${count} ${pluralize(key, count)}`;
        }
      }
    );
    // Remove undefined elements
    timeArray = timeArray.filter((element) => !!element);

    // E.g. ["1 year", "3 days"] => ["1 year", "and 3 days left"]
    timeArray.push( `${timeArray.pop()} left`);
    if (timeArray.length > 1) {
      timeArray.push( `and ${timeArray.pop()}`);
    }

    // E.g. ["1 year", "and 3 days left"] => "1 year and 3 days left"
    let timeString = '';
    if (timeArray.length > 2) {
      timeString = timeArray.join(', ');
    } else {
      timeString = timeArray.join(' ');
    }

    return (
      <div style={styles.timeRemaining}>
        {timeString}
      </div>
    );
  }
}

TimeRemaining.propTypes = {
    issue: React.PropTypes.object.isRequired,
};
