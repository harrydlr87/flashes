import { handleActions } from 'redux-actions';
import { mergePayloadInStateProperty, mergeState } from '../../common/util/state';
import { getUserData, subscribeToSource, unSubscribeFromSource } from './actions';

const initialState = {
  user: null,
};

export default handleActions({
  [subscribeToSource]: (state, action) => {
    const { subscribedSources, ...userData } = state.user;
    const newSubscribedSourceId = action.payload.sourceId;
    return mergeState(state, {
      user: {
        ...userData,
        subscribedSources: [...subscribedSources, newSubscribedSourceId]
      }
    });
  },
  [unSubscribeFromSource]: (state, action) => {
    const { subscribedSources, ...userData } = state.user;
    const removedSubscribedSourceId = action.payload.sourceId;
    return mergeState(state, {
      user: {
        ...userData,
        subscribedSources: subscribedSources.filter(sourceId => sourceId !== removedSubscribedSourceId),
      }
    });
  },
  [getUserData]: mergePayloadInStateProperty('user'),
}, initialState);

/** Selectors */
export const selectUser = ({ application }) => application.user;
