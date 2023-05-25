import { configureStore } from '@reduxjs/toolkit';

import developmentsSlice from './developmentSlice';
import userSlice from './user';

const store = configureStore({
  reducer: {
    developments: developmentsSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
