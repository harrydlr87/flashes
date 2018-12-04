import React from 'react';
import { connect } from 'react-redux';

const Error = ({ error }) => (
  <div className="field-error">{error && (error.error.message || 'An error happened')}</div>
);

const mapStateToProps = state => ({
  error: state.form.register && state.form.register.submitErrors,
});

const enhance = connect(mapStateToProps);

export default enhance(Error);
