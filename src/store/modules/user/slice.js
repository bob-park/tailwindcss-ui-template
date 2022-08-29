import { createSlice } from '@reduxjs/toolkit';

import reducer from './reducer';

const initialState = {
  isLoggedIn: false,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: reducer,
});

export default slice;
