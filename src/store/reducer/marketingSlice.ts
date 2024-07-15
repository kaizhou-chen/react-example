import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface marketingState {
  marketingUpdate: any;
  marketingView: any,
  marketingQuery: object;
}

const initialState: marketingState = {
  marketingUpdate: null,
  marketingView: null,
  marketingQuery: {},
}

export const marketingSlice = createSlice({
  name: 'marketing',
  initialState,
  reducers: {
    setMarketingUpdate: (state, action) => {
      state.marketingUpdate = action.payload;
    },
    setMarketingView: (state, action) => {
      state.marketingView = action.payload;
    },
    setMarketingQuery: (state, action) => {
      state.marketingQuery = action.payload;
    },
  },
});
  
// 可以简单的理解为 setters
export const { setMarketingUpdate, setMarketingView, setMarketingQuery } = marketingSlice.actions;

// 可以简单的理解为 getters
export const getMarketingUpdate = (state: RootState) => state.marketing.marketingUpdate;
export const getMarketingView = (state: RootState) => state.marketing.marketingView;
export const getMarketingQuery = (state: RootState) => state.marketing.marketingQuery;

export default marketingSlice.reducer