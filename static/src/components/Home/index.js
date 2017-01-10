import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/data';

import AddressSearchInput from '../AddressSearchInput';
import AddressView from '../AddressView';
import AccountBalance from 'material-ui/svg-icons/action/account-balance';
import Phone from 'material-ui/svg-icons/communication/phone';
import Build from 'material-ui/svg-icons/action/build';
import './style.scss';

var styles = {
  container: {
  },
  hero: {
    minHeight: '80vh',
    background: "linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.0)), url(/src/images/capitol-building-hero.jpg) 20% 0% / cover no-repeat",
    position: 'relative',
  },
  heroText: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: '4em',
    color: '#EEE',
    textShadow: '1px 0px 1px #000',
    textAlign: 'center',
    marginTop: '15vh',
  },
  subtitle: {
    marginTop: 0,
    marginBottom: 0,
    color: '#EEE',
    textAlign: 'center',
  },
  subtitleBanner: {
    minHeight: '20vh',
    backgroundColor: '#f44336',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    paddingTop: '30px',
    paddingBottom: '30px',
    textAlign: 'center',
  },
  iconStyle: {
    width: '33%',
    height: 'auto',
  }
};

function mapStateToProps(state) {
  const { setExpandedIssueId } = state.data;

  return {
    setExpandedIssueId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { issueId, setExpandedIssueId } = this.props;

    if (issueId) {
      setExpandedIssueId(issueId);
    }
  }

  render() {
    const { title, subTitle } = this.props;

    console.log('title', title);
    console.log('subTitle', subTitle);
    console.log('ISSUE ID', this.props.expandedIssueId);
    console.log('ISSUE ID', this.props.issueId);

    return (
      <section style={styles.container} className="container-fluid">
        <div style={styles.hero} className="row">
            <h1 style={styles.heroText} className="col-xs-12 col-xs-offset-0 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
              { title }
            </h1>
            <AddressView />
        </div>
        <div style={styles.subtitleBanner} className="row">
          <h3 style={styles.subtitle} className="col-xs-10 col-xs-offset-1">
            { subTitle }
          </h3>
        </div>
        <div style={styles.description} className="row">
          <p>This is where some words go</p>
          <p>
            <AccountBalance style={styles.iconStyle}/>
          </p>
          <p>This is where some words go</p>
          <p>
            <Phone style={styles.iconStyle}/>
          </p>
          <p>This is where some words go</p>
          <p>
            <Build style={styles.iconStyle}/>
          </p>
        </div>
      </section>
    );
  }
}

Home.propTypes = {
  title: React.PropTypes.string,
  subTitle: React.PropTypes.string,
};

Home.defaultProps = {
  title: "Call for Action",
  subTitle: "Call Congress. Make a difference.",
};

export default Home;
