/**
 * Auth singleton to store the user credentials (tokens, etc)
 */
class Auth {
  constructor() {
    this.authTokens = {
      token: null,
    };
    this.logged = false;
  }

  setCredentials({ token }) {
    this.authTokens = { 'x-access-token': token };
    this.logged = true;
  }

  get credentials() {
    return this.logged ? this.authTokens : null;
  }
}

export default new Auth();
