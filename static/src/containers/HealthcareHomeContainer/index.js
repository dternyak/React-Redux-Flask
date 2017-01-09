import React from 'react';

/* components */
import { Home } from '../../components/Home';

export const HealthcareHomeContainer = () => {
  const issueCopy = {
    title: "Save Affordable Healthcare",
    subTitle: "Congress wants to take away your healthcare. Call them before it's too late.",
  };

  return (
    <section>
        <Home title={issueCopy.title} subTitle={issueCopy.subTitle} />
    </section>
  );
}
