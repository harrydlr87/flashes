import React from 'react';
import { connect } from 'react-redux';
import Sources from '../../common/components/sources';
import Container from '../../common/components/container';

const Dashboard = ({ user }) => (
  <Container>
    <Sources subscribedSources={user && user.subscribedSources} />
  </Container>
);

const mapStateToProps = (state) => ({
  user: state.application.user,
});

const enhance = connect(mapStateToProps);

export default enhance(Dashboard);
