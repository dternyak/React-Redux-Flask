import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import {Tabs, Tab} from 'material-ui/Tabs';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';


// https://github.com/mikamaunula/react-material-icons
// import mui from 'material-ui';
// import AlarmIcon from 'react-material-icons/icons/action/alarmicon';

export default class IssueCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      position: 'for',
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

  handlePositionChange = (value) => {
    this.setState({
      value: value,
    });
  };

  renderAvatar(representative) {
    const borderColor = representative.party === 'Democratic' ? "#1E90FF" : "#DE0702";
    const styles = {
      avatar: {
        border: '5px solid '+ borderColor,
        float: 'left',
        height: '150px',
        width: 'auto',
      },
    }

    return (
      <Avatar
        src={representative.image_url}
        style={styles.avatar}
      />
    );
  }

  renderForOrAgainst() {
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
    }

    return (
      <Tabs
        value={this.state.positionValue}
        onChange={this.handlePositionChange}
      >
        <Tab label="For" value="for" >
          <div>
            <h2 style={styles.headline}>Controllable Tab A</h2>
            <p>
              Tabs are also controllable if you want to programmatically pass them their values.
              This allows for more functionality in Tabs such as not
              having any Tab selected or assigning them different values.
            </p>
          </div>
        </Tab>
        <Tab label="Against" value="against">
          <div>
            <h2 style={styles.headline}>Controllable Tab B</h2>
            <p>
              This is another example of a controllable tab. Remember, if you
              use controllable Tabs, you need to give all of your tabs values or else
              you wont be able to select them.
            </p>
          </div>
        </Tab>
      </Tabs>
    );
  }

  renderTruncatedDescription(summary) {
    if (!this.state.expanded) {
      return (
        <div style={{ fontSize: '14px', marginLeft: '16px', marginRight: '16px' }} onClick={this.handleExpand}>
          {summary.substr(0,130)+'...'}
        </div>
      );
    }
  }

  render() {
    let { issue } = this.props;
    let { representatives } = issue;
    let representative = representatives[0];
    let level = representative.level;
    let phoneNumber = representative.phones[0];

    const styles = {
      callButton: {
        margin: 12,
        marginLeft: 0,
        marginRight: 0,
        width: '100%',
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
      summary: {
        fontSize: '16px',
        marginBottom: '10px',
      },
      "muidocsIconCustomGithub:before": {
        content: "\e625",
      },
      avatar: {
        borderWidth: '10px',
        borderColor: '#000',
      },
      repTitleContainer: {
        marginTop: '10px'
      },
      repName: {
      },
      repTitle: {
      },
    };

    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={issue.title}
          titleStyle={{fontSize: '22px', fontWeight: 'bold',}}
          subtitle={level}
          subtitleStyle={{fontSize: '16px'}}
          actAsExpander={true}
          showExpandableButton={false}
        />

        {this.renderTruncatedDescription(issue.summary)}

        <CardText expandable={true} >
          <div style={styles.summary}>
            {issue.summary}
          </div>

          {this.renderAvatar(representative)}

          <div style={styles.repTitleContainer}>
            <div style={styles.repName}>
              {representative.first_name + " " + representative.last_name}
            </div>
            <div style={styles.repTitle}>
              {level}
            </div>
          </div>

          {this.renderForOrAgainst()}

          <RaisedButton
            href={"tel:"+phoneNumber}
            label={"Call Your Rep!"}
            labelPosition="before"
            primary={true}
            icon={<FontIcon className="phone" />}
            style={styles.callButton}
          />
        </CardText>

        <CardActions actAsExpander={true} showExpandableButton={true} expandableButtonStyle={{margin: '50px'}} />
      </Card>
    );
  }
}

IssueCard.propTypes = {
    issue: React.PropTypes.object.isRequired,
};
