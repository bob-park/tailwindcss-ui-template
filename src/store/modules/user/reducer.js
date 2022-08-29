const reducer = {
  // async increment
  isLoggedIn: (state, action) => {
    state.isLoggedIn = true;
    state.user = action.payload;
  },
  isLoggedOut: (state) => {
    state.isLoggedIn = false;
    state.user = null;
  },
};

export default reducer;
