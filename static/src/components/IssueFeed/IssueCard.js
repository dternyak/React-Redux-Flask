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
import FormatQuote from 'material-ui/svg-icons/editor/format-quote';
import Phone from 'material-ui/svg-icons/communication/phone';
import TimeRemaining from './TimeRemaining';
import { mapLevelAndRole } from '../../utils/misc';

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
        border: '3px solid ' + borderColor,
        background: 'url(\'' + representative.image_url + '\') top center/cover no-repeat',
        width: '100%',
        height: '100%',
        maxHeight: '84px',
        maxWidth: '84px',
        borderRadius: '50%',
        margin: '0 auto',
      },
    }

    return (
      <div style={styles.avatar}>
        </div>
    );
  }

  renderScript(representative, issue) {
    const styles = {
      script: {
        position: 'relative',
        border: '1px solid #f1f1f1',
        clear: 'both',
        padding: '5px',
        borderRadius: '2px',
        them: {
          fontStyle: 'italic',
          marginBottom: '8px',
        },
        you: {
          marginBottom: '8px',
        }
      },
      iconStyles: {
        height: '40px',
        width: '40px',
        position: 'absolute',
        left: '2px',
        top: '30px',
      }
    }

    return (
      <div style={styles.script}>
        <h5 style={{marginBottom: '20px'}}>What to say:</h5>
        <FormatQuote style={styles.iconStyles} />
        <div style={{padding: '0 15px 0 35px'}}>
          <div style={styles.script.them}>
            Them: Representative {representative.last_name}&rsquo; office, how can I help you?
          </div>
          <div style={styles.script.you}>
            Hi, my name is <span style={{fontStyle: 'italic'}}>[Your Name]</span>, and I&rsquo;m a resident of your district.
          </div>
          <div style={styles.script.you}>
            I am calling in [<span style={{color: 'green'}}>support of</span>/<span style={{color: 'red'}}>opposition to</span>] <span style={{fontWeight: 'bold'}}>{issue.code || issue.title}</span>. Can I count on the representative&rsquo;s support?
          </div>
          <div style={styles.script.them}>
            Them: [Their Response]<br />
          </div>
          <div style={styles.script.them}>
            Them: I will let the representative know you called.
          </div>
          <div style={styles.script.you}>
            Thank you for your time.
          </div>
        </div>
      </div>
    );
  }

  renderTruncatedDescription(summary, styles) {
    if (!this.state.expanded) {
      return (
        <CardText style={styles.summary} onClick={this.handleExpand}>
          {summary.substr(0,130)+'...'}
        </CardText>
      );
    }
  }

  renderTimeRemaining(issue) {
    return <TimeRemaining issue={issue} />;
  }

  render() {
    let { issue } = this.props;
    let { representatives } = issue;
    let representative = representatives[0];
    let phoneNumber = representative.phones[0];

    let {level, role, bodyOfGovernment} = mapLevelAndRole(representative.level, representative.role);

    const styles = {
      callButton: {
        margin: '15px 0',
      },
      callLabel: {
        padding: 16
      },
      expandArrow: {
        right: 0,
        left: 0,
        margin: '0 auto',
        marginTop: '20px',
        position: 'absolute',
        width: '48px',
        padding: 0,
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

    var summaryStyles = {
      summary: {
        fontSize: '14px',
        marginBottom: this.state.expanded ? '-10px': '10px',
        padding: '0 16px',
      },
    }

    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange} style={{ paddingBottom: '40px' }}>
        <CardHeader
          textStyle={{paddingRight: 0,}}
          title={issue.title}
          titleStyle={{fontSize: '20px', fontWeight: 'bold',}}
          subtitle={level + ' ' + bodyOfGovernment}
          subtitleStyle={{fontSize: '14px', float: 'left'}}
          actAsExpander={true}
          showExpandableButton={false}
          children={this.renderTimeRemaining(issue)}
        />

        {this.renderTruncatedDescription(issue.summary, summaryStyles)}

        <CardText expandable={true} style={summaryStyles.summary}>
          <div style={{marginBottom: '10px'}}>
            {issue.summary}
          </div>

          <div className="row" style={{marginBottom: '10px'}}>
            <div className="col-xs-4 col-sm-3" style={{paddingRight: 0}}>
              {this.renderAvatar(representative)}
            </div>

            <div className="col-xs-8 col-sm-9" style={{paddingLeft: 5}}>
              <div style={styles.repTitleContainer}>
                <h4 style={styles.repName}>
                  {representative.full_name}
                </h4>
                <div style={styles.repTitle}>
                  {level + ' ' + role}
                </div>
              </div>
            </div>
          </div>

          {this.renderScript(representative, issue)}

          <RaisedButton
            href={"tel:"+phoneNumber}
            label={"Call Your Rep!"}
            labelPosition="after"
            labelStyle={styles.callLabel}
            buttonStyle={{height: '68px', padding: 16,}}
            primary={true}
            fullWidth={true}
            icon={<Phone />}
            style={styles.callButton}
          />
        </CardText>

        <CardActions actAsExpander={true} showExpandableButton={true} style={styles.expandArrow} />
      </Card>
    );
  }

}

IssueCard.propTypes = {
    issue: React.PropTypes.object.isRequired,
};
