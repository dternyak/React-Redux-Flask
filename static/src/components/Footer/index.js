import React from 'react';

/* component styles */
import { styles } from './styles.scss';

export const Footer = () =>
    <footer className={`${styles}`}>
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <p>© DZT 2016</p>
                </div>
            </div>
        </div>
    </footer>;
