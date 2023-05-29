import { configureStore } from '@reduxjs/toolkit';

import developmentsSlice from './developmentSlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    developments: developmentsSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
