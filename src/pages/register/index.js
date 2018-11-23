import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { register } from '../../application/store/actions';
import { email, minLength, required } from '../../common/util/form-validations';
import './register.css';

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

const submit = (values, dispatch) => {
  const onError = (response) => {
    return new SubmissionError({
      _error: response.message
    })
  };

  return dispatch(register(values, onError));
};

const SimpleForm = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    error,
  } = props;

  // TODO handle server errors

  return (
    <section className="register">
      <h1>Register</h1>
      <form className="register-form" onSubmit={handleSubmit}>
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
        { error && <div>{error}</div> }
        <div className="submit-container">
          <button type="submit" disabled={pristine || submitting}>Submit</button>
        </div>
      </form>
    </section>
  )
};

const enhance = compose(
  reduxForm({
    form: 'register',
    onSubmit: submit
  })
);

export default enhance(SimpleForm);
