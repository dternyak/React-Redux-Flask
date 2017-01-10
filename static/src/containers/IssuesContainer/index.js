import React from 'react';

/* components */
import IssuesView from '../../components/IssuesView';
import PageWrapper from '../../components/PageWrapper';
import { Header } from '../../components/Header';

export const IssuesContainer = () =>
    <div>
      <Header />
      <div
        className="container"
        style={{ marginTop: 10, paddingBottom: 30 }}
      >
        <IssuesView />
      </div>
    </div>;
