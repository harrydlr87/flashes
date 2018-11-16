import React from 'react';
import Sources from '../../common/components/sources';
import Container from '../../common/components/container';

const Dashboard = () => (
  <Container>
    <h1>My sources</h1>
    <Sources activeFilters={{ subscribedSources: true }} />
  </Container>
);

export default Dashboard;
