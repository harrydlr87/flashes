import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from "react-router";
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { register } from '../../application/store/actions';
import Error from './components/submit-error';
import { email, minLength, required } from '../../common/util/form-validations';
import './register.css';
import { routes } from "../../application/config/routes-config";

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => (
  <div className="field">
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && (error && <div className="field-error">{error}</div>) }
    </div>
  </div>
);

const SimpleForm = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    register,
    history,
  } = props;

  const submit = (values) => new Promise(async (resolve, reject) => {
    const { error, payload } = await register(values);
    if (error) {
      reject(payload);
    } else {
      history.push(routes.dashboard.path);
    }
  }).catch((error) => {
    throw new SubmissionError({ error })
  });

  return (
    <section className="register">
      <h1>Register</h1>
      <form className="register-form" onSubmit={handleSubmit(submit)}>
        <Field
          label="Name"
          name="name"
          component={renderField}
          type="text"
          placeholder="Name"
          validate={required}
        />
        <Field
          label="Email"
          name="email"
          component={renderField}
          type="email"
          placeholder="Email"
          validate={[email, required]}
        />
        <Field
          name="password"
          label="Password"
          component={renderField}
          type="password"
          placeholder="Password"
          validate={[minLength(6), required]}
        />
        <Field
          name="confirmPassword"
          label="Repeat Password"
          component={renderField}
          type="password"
          placeholder="Repeat Password"
        />
        <Error />
        <div className="submit-container">
          <button type="submit" disabled={pristine || submitting}>Submit</button>
        </div>
      </form>
    </section>
  )
};

const validate = values => {
  const errors = {};
  if (!values.confirmPassword ) {
    errors.confirmPassword = 'Required';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Password mismatched' ;
  }
  return errors;
};


const enhance = compose(
  withRouter,
  connect(null, { register }),
  reduxForm({
    form: 'register',
    validate,
  }),
);

export default (enhance(SimpleForm));
