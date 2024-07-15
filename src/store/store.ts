import { configureStore } from '@reduxjs/toolkit';

import appSlice from './reducer/appSlice';
import marketingSlice from './reducer/marketingSlice';

export const store = configureStore({
  reducer: {
    app: appSlice,
    marketing: marketingSlice
  },
});

// 从 store 本身推断 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;

// 推断类型：{posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;