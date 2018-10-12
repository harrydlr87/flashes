import { handleActions } from 'redux-actions';
import { mergePayloadInStateProperty } from '../../common/util/state';
import { login } from './actions';

const initialState = {
  user: null,
};

export default handleActions({
  [login]: mergePayloadInStateProperty('user'),
}, initialState);

/** Selectors */
export const selectUser = ({ application }) => application.user;
