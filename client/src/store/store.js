import { configureStore } from '@reduxjs/toolkit';

import developmentsSlice from './developmentSlice';
import userSlice from './userSlice';
import allDevelopmentsSlice from './allDevelopmentSlice';

const store = configureStore({
  reducer: {
    allDevelopments: allDevelopmentsSlice.reducer,
    developments: developmentsSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
