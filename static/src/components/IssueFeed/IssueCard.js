import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { RaisedButton, FloatingActionButton } from 'material-ui';
import Toggle from 'material-ui/Toggle';
import {Tabs, Tab} from 'material-ui/Tabs';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import FormatQuote from 'material-ui/svg-icons/editor/format-quote';
import Phone from 'material-ui/svg-icons/communication/phone';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';

import TimeRemaining from './TimeRemaining';
import { mapLevelAndRole } from '../../utils/misc';

// https://github.com/mikamaunula/react-material-icons
// import mui from 'material-ui';
// import AlarmIcon from 'react-material-icons/icons/action/alarmicon';

export default class IssueCard extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { issue, scrollInView, scrollOutOfView } = this.props;
    const { expanded, inView } = issue;

    if (expanded) {
      // IssueCard variables
      const issueId = `#issue_card_${issue.id}`;
      const issueHeight = $(issueId).height();
      const issueTopToDocumentTop = $(issueId).offset().top;
      // Window variables
      const windowTopToDocumentTop = $(window).scrollTop();
      const windowHeight = $(window).height();

      // Show the floatingCallButton on two conditions:
      // 1. IssueCard's bottom is below the window's bottom
      const issueBottomBelowWindow = windowTopToDocumentTop + windowHeight < issueTopToDocumentTop + issueHeight;
      // 2. IssueCard's top is at least 1/2 way up the window.
      const issueTopAboveWindow = windowTopToDocumentTop + 0.5*windowHeight > issueTopToDocumentTop;

      // Save updates and only update `inView` if changing it.
      if ( issueBottomBelowWindow && issueTopAboveWindow ) {
        scrollInView(issue.id);
      } else {
        scrollOutOfView(issue.id);
      }
    }
  };

  handleToggleExpansion = () => {
    /*
      Logic here to deal with "jumpy" scrolling, when an expanded IssueCard above this one is toggled shut.
      1. after calling toggleExpandIssue, adjust scrollTop to keep the IssueCard's distance from the top of the window from changing.
      2. smoothly scroll the IssueCard to the top of the window.
    */

    const { issue, toggleExpandIssue } = this.props;
    const hash = `#issue_card_${issue.id}`;
    const issueToScrollTo = $(hash);
    // Distance from the top of the IssueCard to the top of the document
    const reducedIssueTop = issueToScrollTo.offset().top;
    // Distance down the page that the user has scrolled
    const scrollTop = $(window).scrollTop();
    // Distance between the top of the IssueCard, and the top of the window
    const distanceToWindowTop = reducedIssueTop - scrollTop;

    // Toggle to expand this IssueCard, and reduce any open ones.
    toggleExpandIssue(issue.id);

    // Wait for the DOM to re-render, then:
    setTimeout(
      function(){
        const expandedIssueTop = issueToScrollTo.offset().top;

        // 1. Immediately offset the scrollTop distance, so that distanceToWindowTop is the same for the IssueCard pre- and post-expansion.
        $('body, html').animate({ scrollTop: issueToScrollTo.offset().top - distanceToWindowTop}, 0);

        // 2. Smoothly scroll up until the IssueCard's top is at the top of the screen.
        $('body, html').animate({ scrollTop: issueToScrollTo.offset().top}, 500);
      },
    0);
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
    if (!this.props.issue.expanded) {
      return (
        <CardText style={styles.summary} onClick={this.handleToggleExpansion}>
          {summary.substr(0,130)+'...'}
        </CardText>
      );
    }
  }

  renderSubTitle(issue, level, bodyOfGovernment) {
    return (
      <div>
        <div style={{ fontSize: '14px', color: 'white', display: 'inline' }}>
          {`${level} ${bodyOfGovernment} | `}
        </div>
        <TimeRemaining issue={issue} />
      </div>
    );
  }

  renderCardTitle(issue, level, bodyOfGovernment) {
    return (
      <CardTitle
        title={issue.title}
        titleStyle={{fontSize: '20px', fontWeight: 'bold',}}
        actAsExpander={true}
        showExpandableButton={false}
        children={this.renderSubTitle(issue, level, bodyOfGovernment)}
      />
    );
  }

  renderCallButton(representative, role, styleKey) {
    const phoneNumber = representative.phones[0];
    const { expanded, inView } = this.props.issue;

    // styleKey should be one of: 'callButton', 'floatingCallButton'
    const styles = {
      callButton: {
        margin: 0,
        borderRadius: 0,
      },
      floatingCallButton: {
        position: 'fixed',
        top: 'auto',
        right: 0,
        left: 0,
        bottom: 0,
        margin: 0,
        borderRadius: 0,
        paddin: 16,
        zIndex: 1100,
      },
      callLabel: {
        padding: 16,
      },
    }

    return (
      <RaisedButton
        href={"tel:"+phoneNumber}
        label={`Call ${role} ${representative.last_name}`}
        labelPosition="after"
        labelStyle={styles.callLabel}
        buttonStyle={{height: '68px', padding: 16, borderRadius: 0 }}
        primary={true}
        fullWidth={true}
        icon={<Phone />}
        style={styleKey}
      />
    );
  }

  render() {
    const { issue } = this.props;
    const { expanded, inView, representatives } = issue;
    const representative = representatives[0];
    const phoneNumber = representative.phones[0];

    const {level, role, bodyOfGovernment} = mapLevelAndRole(representative.level, representative.role);

    const styles = {
      callButton: {
        margin: 0,
        borderRadius: 0,
      },
      callLabel: {
        padding: 16,
      },
      floatingCallButton: {
        position: 'fixed',
        top: 'auto',
        right: 0,
        left: 0,
        bottom: 0,
        margin: 0,
        borderRadius: 0,
        paddin: 16,
        zIndex: 1100,
      },
      infoLabel: {
        padding: 16,
        //color: '#073764',
        fontWeight: 700,
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
        marginBottom: expanded ? '-10px': '10px',
        padding: '16px',
      },
    }

    return (
      <Card
        id={`issue_card_${issue.id}`}
        expanded={expanded}
        onExpandChange={this.handleToggleExpansion}
        style={{ marginBottom: '20px' }}>

        <CardMedia overlay={this.renderCardTitle(issue, level, bodyOfGovernment)} onClick={this.handleToggleExpansion}>
          <img src={issue.image_url} />
        </CardMedia>

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
        </CardText>
        <RaisedButton
          onClick={this.handleToggleExpansion}
          label={expanded ? "Collapse" : "Learn more"}
          labelPosition="after"
          labelStyle={styles.infoLabel}
          buttonStyle={{height: '68px', padding: 16, borderRadius: 0}}//, backgroundColor: 'white'}}
          //primary={true}
          //buttonStyle={{height: '68px', padding: 16, borderRadius: 0 }}
          secondary={true}
          fullWidth={true}
          icon={expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          style={styles.callButton}
        />
        {this.renderCallButton(representative, role, styles.callButton)}
        {(expanded && inView) ? this.renderCallButton(representative, role, styles.floatingCallButton) : undefined}
      </Card>
    );
  }

}

IssueCard.propTypes = {
    issue: React.PropTypes.object.isRequired,
    toggleExpandIssue: React.PropTypes.func.isRequired,
    scrollInView: React.PropTypes.func.isRequired,
    scrollOutOfView: React.PropTypes.func.isRequired,
};
