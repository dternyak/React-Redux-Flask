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
    height: '66vh',
    background: "linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.0)), url(https://qzprod.files.wordpress.com/2016/11/rtx2scms-e1479141633942.jpg?quality=80&strip=all&w=3200) 20% 0% / cover no-repeat",
    position: 'relative',
  },
  heroText: {
    position: 'absolute',
    top: '10%',
    left: 0,
    right: 0,
    margin: '0 auto',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: '4em',
    color: '#EEE',
    textShadow: '1px 0px 1px #000',
    textAlign: 'center',
  },
  heroSubtitle: {
    color: '#EEE',
    textAlign: 'center',
    position: 'absolute',
    bottom: '15%',
  },
  ctaBanner: {
    minHeight: '35vh',
    backgroundColor: '#F44336',
    paddingTop: '30px',
    paddingBottom: '30px',
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
          <h1 style={styles.heroText} className="col-xs-8 col-md-12">Call for Action</h1>
          <h3 style={styles.heroSubtitle} className="col-xs-10 col-xs-offset-1">Your direct line to democracy</h3>
      </div>
      <div style={styles.ctaBanner} className="row">
        <AddressView />
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
