/**
 * Function to merge the old state with the new one
 * @param existingState
 * @param newState
 * @returns {{}}
 */
export const mergeState = (existingState, newState) => ({
  ...existingState,
  ...newState,
});

/**
 * Function to merge the action payload in a specific state property
 * @param property
 */
export const mergePayloadInStateProperty = property => (state, action) => {
  if (action && action.payload !== undefined && !action.error) {
    return mergeState(state, {
      [property]: action.payload,
    });
  }
  return state;
};

/**
 * Function to wrap an action reducer to only execute it when the action had no errors
 * @param handleAction
 */
export const onActionSuccess = handleAction => (state, action) => {
  if (!action.error) {
    return handleAction(state, action);
  }
  return state;
};
