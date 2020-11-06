export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state.store');
    if (serializedState === null) {
      // console.log("localStorage.sj > loadState > serializedState(null)", serializedState)
      return undefined;
    }
    // console.log("localStorage.sj > loadState > serializedState", serializedState)
    return JSON.parse(serializedState);

  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.store);
    // console.log("localStorage.sj > loadState > saveState > serializedState", serializedState)
    localStorage.setItem('state.store', serializedState);
  } catch (err) {
    // console.log("localStorage.sj > loadState > saveState err", err)
  }
};