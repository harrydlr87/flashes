import React from 'react';
import { connect } from 'react-redux';
import Sources from '../../common/components/sources';
import Container from '../../common/components/container';

const Profile = ({ user }) => (
  <Container>
    <h1>My sources</h1>
    <Sources sources={user.subscribedSources} subscribedSources={user.subscribedSources} />
  </Container>
);

const mapStateToProps = (state) => ({
  user: state.application.user,
});

const enhance = connect(mapStateToProps);

export default enhance(Profile);
