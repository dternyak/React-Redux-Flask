import React from 'react';
import AddressSearchInput from './AddressSearchInput';
import RegisterView from '../RegisterView';
import './style.scss';

var styles = {
  hero: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#073764',
    minHeight: '40vh',
  },
  h1: {
    paddingTop: '10vh',
    fontWeight: '700',
    fontSize: '103',
    position: 'relative',
    zIndex: 2,
    color: '#FFB128',
  },
  img: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: 'auto',
    opacity: 0.4,
  }
};

export const Home = () =>
    <section>
        <div style={styles.hero}>
          <img style={styles.img} src="https://qzprod.files.wordpress.com/2016/11/rtx2scms-e1479141633942.jpg?quality=80&strip=all&w=3200"></img>
          <h1 style={styles.h1}>Call for Action</h1>
          <RegisterView />
        </div>
        <AddressSearchInput />
    </section>;
