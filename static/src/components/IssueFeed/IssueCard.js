import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';

export default class IssueCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };

  render() {
    let { issue } = this.props;
    let { representatives } = issue;
    let level = representatives[0].level;
    let phoneNumber = representatives[0].phones[0];

    const styles = {
      button: {
        margin: 12,
      },
      exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
      },
    };

    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={issue.description}
          subtitle={level}
          avatar="http://lorempixel.com/400/200/"
          actAsExpander={true}
          showExpandableButton={true}
        />

        <CardText expandable={true} actAsExpander={true}>
          {issue.description}
        </CardText>

        <CardActions>
          <RaisedButton
            label="Learn More"
            labelPosition="before"
            style={styles.button}
            containerElement="label"
            onTouchTap={this.handleExpandChange}
          />
          <RaisedButton
            href="tel:#{ phoneNumber }"
            label="Label before"
            labelPosition="before"
            primary={true}
            icon={<FontIcon className="fa-phone" />}
            style={styles.button}
          />
        </CardActions>
      </Card>
    );
  }
}

IssueCard.propTypes = {
    issue: React.PropTypes.object.isRequired,
};
