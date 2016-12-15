import React from 'react';
import AddressSearchInput from './AddressSearchInput';
import './style.scss';

// var styles = {
//   banner: {
//     background: 'rgba(7, 55, 100, 0.71), url(https://qzprod.files.wordpress.com/2016/11/rtx2scms-e1479141633942.jpg?quality=80&strip=all&w=3200)', //'#073764'
//     backgroundSize: 'cover',
//     height: '30%',
//   },
// };

export const Home = () =>
    <section>
        <div className="container text-center">
          <div className={'hero'}>
          </div>
          <h1 style={{ color: '#FFB128' }}>Hello</h1>
          <AddressSearchInput />
        </div>
    </section>;
