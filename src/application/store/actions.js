import { createAction } from 'redux-actions';
import postJson from "../../common/http/methods/post";

/** Performs the login action authenticating the user and retrieving the user data  */
export const login = createAction('application.login', async (email, password) => {
  const { token } = await postJson('/users/login', { email, password });
  localStorage.setItem('token', token);

  return token;
});
