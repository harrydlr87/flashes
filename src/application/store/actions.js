import { createAction } from 'redux-actions';
import postJson from "../../common/http/methods/post";
import getJson from "../../common/http/methods/get";
import Auth from '../../common/http/auth';

/** Performs the source subscription action  */
export const subscribeToSource = createAction('application.subscribeToSource', sourceId => {
  return postJson('/users/subscribe', { sourceId });
});

/** Performs the source unsubscription action  */
export const unSubscribeFromSource = createAction('application.unSubscribeFromSource', sourceId => {
  return postJson('/users/unsubscribe', { sourceId });
});

/** Performs the login action authenticating the user and retrieving the user data  */
export const getUserData = createAction('application.user-data', async (email, password) => {
  return await getJson('/users/user-data', { email, password });
});

/** Performs user registration  */
export const register = createAction('application.register', ({ name, email, password }, onError) => async dispatch => {
  const { token } = await postJson('/users/register', { name, email, password });
  localStorage.setItem('token', token);
  Auth.setCredentials({ token });
  dispatch(getUserData());
});

/** Performs the login action authenticating the user and retrieving the user data  */
export const login = createAction('application.login', (email, password) => async dispatch => {
  const { token } = await postJson('/users/login', { email, password });
  localStorage.setItem('token', token);
  Auth.setCredentials({ token });
  dispatch(getUserData());

  return token;
});

/** Performs the logout action removing the current logged user and it's token  */
export const logout = createAction('application.logout', (callback) => {
  localStorage.removeItem('token');
  Auth.removeCredentials();
  callback();
});

