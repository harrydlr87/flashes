import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { register } from '../../application/store/actions';
import './register.css';

const SimpleForm = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    register,
  } = props;
  return (
    <section className="register">
      <h1>Register</h1>
      <form className="register-form" onSubmit={handleSubmit((values) => register(values))}>
        <div className="field">
          <label>Name</label>
          <div>
            <Field
              name="name"
              component="input"
              type="text"
              placeholder="Name"
            />
          </div>
        </div>
        <div className="field">
          <label>Email</label>
          <div>
            <Field
              name="email"
              component="input"
              type="email"
              placeholder="Email"
            />
          </div>
        </div>
        <div className="field">
          <label>Password</label>
          <div>
            <Field
              name="password"
              component="input"
              type="password"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="submit-container">
          <button type="submit" disabled={pristine || submitting}>Submit</button>
        </div>
      </form>
    </section>

  )
};

const enhance = compose(
  connect(null, { register }),
  reduxForm({
    form: 'register',
  })
);

export default enhance(SimpleForm);
