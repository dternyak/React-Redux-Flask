import React from 'react';

/* application components */
import { Header } from './Header';

export const PageWrapper = () =>
    <div>
      <Header />
      <div
        className="container"
        style={{ marginTop: 10, marginBottom: 10 }}
      >
      </div>
    </div>;
