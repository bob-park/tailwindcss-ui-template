import { createSelector } from '@reduxjs/toolkit';

import slice from './slice';

const selectorAllState = createSelector(
  (state) => state.isLoggedIn,
  (state) => state.user,
  (isLoggedIn, user) => ({
    isLoggedIn,
    user,
  }),
);

export const userSelector = {
  all: (state) => selectorAllState(state[USER]),
};

export const USER = slice.name;
export const userReducer = slice.reducer;
export const userActions = slice.actions;
