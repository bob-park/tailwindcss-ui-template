import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { USER, userReducer } from './modules/user';

const rootReducer = combineReducers({
  [USER]: userReducer,
});

function rootStore() {
  const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
  });

  return store;
}

export default rootStore();
