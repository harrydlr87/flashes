import React from 'react';
import { connect } from 'react-redux' ;
import { login } from '../../../../../application/store/actions';
import './login.css';
import { routes } from '../../../../config/routes-config';
import { NavLink } from 'react-router-dom';

class Login extends React.Component {
  state = {
    error: null,
  };

  emailInputRef = (emailInput) => {
    this.emailInput = emailInput;
  };

  passwordInputRef = (passwordInput) => {
    this.passwordInput = passwordInput;
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { passwordInput, emailInput } = this;
    const response = await this.props.login(emailInput.value, passwordInput.value);

    if(response.error) {
      this.setState({ error: response.error });
    }
  };

  render() {
    const { user } = this.props;
    const { error } = this.state;
    return(
      <div className="login">
        {!user ? (
          <form onSubmit={this.onSubmit}>
            <input type="text" name="email" placeholder="E-mail" ref={this.emailInputRef} />
            <input type="password" name="password" placeholder="Password" ref={this.passwordInputRef}  />
            <button type="submit">Login</button>
          </form>
        ) : (
          <div>
            <p className="greet">Bienvenido</p>
            <NavLink exact to={routes.profile.path}>Profile</NavLink>
          </div>
        )}

        {error && <p className="error">Ha habido un error</p>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.application.user,
});

const enhance = connect(mapStateToProps, { login });

export default enhance(Login);
