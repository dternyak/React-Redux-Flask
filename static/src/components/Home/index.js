import React from 'react';
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
    background: "linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.0)), url(https://qzprod.files.wordpress.com/2016/11/rtx2scms-e1479141633942.jpg?quality=80&strip=all&w=3200) 20% 0% / cover no-repeat",
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

export const Home = () =>
    <section style={styles.container} className="container-fluid">
      <div style={styles.hero} className="row">
          <h1 style={styles.heroText} className="col-xs-8 col-xs-offset-2 col-md-12 col-md-offset-0">Call for Action</h1>
          <AddressView />
      </div>
      <div style={styles.subtitleBanner} className="row">
        <h3 style={styles.subtitle} className="col-xs-10 col-xs-offset-1">Your direct line to democracy</h3>
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
    </section>;
