import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface appState {
  count: number,
  userInfo: object;
}

const initialState: appState = {
  count: 10,
  userInfo: {},
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

// 可以简单的理解为 setters
export const { setCount, setUserInfo } = appSlice.actions;

// 可以简单的理解为 getters
export const getCount = (state: RootState) => state.app.count;
export const getUserInfo = (state: RootState) => state.app.userInfo;

export default appSlice.reducer;