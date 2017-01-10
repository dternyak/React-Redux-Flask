import React from 'react';

/* component styles */
import { styles } from './styles.scss';

export const Footer = () =>
    <footer className={`${styles}`}>
        <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    <div>&copy; 2016 <a href="http://twitter.com/barneyjackson">@barneyjackson</a> &amp; <a href="http://twitter.com/stedmanblake">@stedmanblake</a></div>
                </div>
            </div>
        </div>
    </footer>;
