import { configureStore } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import allDevelopmentsSlice from './allDevelopmentSlice';

const store = configureStore({
  reducer: {
    allDevelopments: allDevelopmentsSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
