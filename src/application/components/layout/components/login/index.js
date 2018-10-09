import React from 'react';
import { postJson } from '../../../../../common/http';
import './login.css';

class Login extends React.Component {
  state = {
    logged: false,
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

    try {
      const { token } = await postJson('/users/login', { email: emailInput.value, password: passwordInput.value });

      localStorage.setItem('token', token);
      this.setState({ logged: true });
    } catch(err) {
      console.log(err)
    }
  };

  render() {
    const { logged } = this.state;
    return(
      <div className="login">
        {!logged ? (
          <form onSubmit={this.onSubmit}>
            <input type="text" name="email" placeholder="E-mail" ref={this.emailInputRef} />
            <input type="password" name="password" placeholder="Password" ref={this.passwordInputRef}  />
            <button type="submit">Login</button>
          </form>
        ) : (
          <p className="greet">Bienvenido</p>
        )}
      </div>
    );
  }
}

export default Login;
