import React from 'react';
import { connect } from 'react-redux' ;
import { compose, branch, renderNothing } from 'recompose';
import { withRouter } from "react-router";
import { login, logout } from '../../../../../application/store/actions';
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

  goToDashBoard = () => {
    this.props.history.push(routes.dashboard.path);
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { passwordInput, emailInput } = this;
    const response = await this.props.login(emailInput.value, passwordInput.value);

    if(response.error) {
      this.setState({ error: response.error });
    } else {
      this.goToDashBoard();
    }
  };

  render() {
    const { user, logout } = this.props;
    const { error } = this.state;
    return(
      <div className="login">
        {!user ? (
          <form onSubmit={this.onSubmit}>
            <input type="text" name="email" placeholder="E-mail" ref={this.emailInputRef} />
            <input type="password" name="password" placeholder="Password" ref={this.passwordInputRef}  />
            <button className="login-button" type="submit">Login</button>
            <NavLink className="blue-button" exact to={routes.register.path}>Register</NavLink>
          </form>
        ) : (
          <div>
            <p className="greet">Welcome {user.name}</p>
            <button className="blue-button" type="submit" onClick={() => logout(this.goToDashBoard)}>Logout</button>
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

const enhance = compose(
  withRouter,
  branch(({ location }) => location.pathname === routes.register.path, renderNothing),
  connect(mapStateToProps, { login, logout }),
);

export default enhance(Login);
