import React, { Component, PropTypes } from 'react';

/* application components */
import { Header } from './Header';

export const PageWrapper = (children) =>
    <div>
      <Header />
      <div
        className="container"
        style={{ marginTop: 10, paddingBottom: 250 }}
      >
        {children}
      </div>
    </div>;
