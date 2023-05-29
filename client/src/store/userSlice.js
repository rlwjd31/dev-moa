/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUserInfo } from '../api/auth';

export const getUserInfoAction = createAsyncThunk(
  'getUserInfo',
  async (userId, rejectWithValue) => getUserInfo(userId, rejectWithValue),
);

const initialState = {
  status: 'loading',
  email: '',
  id: '',
  name: '',
  profileImage: '',
  createAt: '',
  modifiedAt: '',
  isLogin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state, action) => {
      Object.entries(state).forEach(([key]) => {
        state[key] = null;
      });
    },
  },
  extraReducers: builder => {
    builder.addCase(getUserInfoAction.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getUserInfoAction.fulfilled, (state, action) => {
      // ! Error log: immer library 때문에 pointer를 바꾸지 않은 상태에서 state를 업데이트해야하는데
      // ! 아래와 같이 하면 pointer가 바뀌어서 State가 제대로 바뀌지 않아 pointer는 그대로 두면서
      // ! state를 update하는 assign을 이용함
      // state = {...action.payload.userInfo, status: 'success'}
      Object.assign(state, { ...action.payload.userInfo, status: 'success' });
    });
    builder.addCase(getUserInfoAction.rejected, (state, action) => {
      state.status = 'failed';
    });
  },
});

export const { reset } = userSlice.actions;
export default userSlice;
