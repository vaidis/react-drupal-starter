export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state.store');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);

  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.store);
    localStorage.setItem('state.store', serializedState);
  } catch (err) {
  }
};