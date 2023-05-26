/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUserInfo } from '../api/auth';

const initialState = {
  status: 'loading',
  id: '',
  name: '',
  accessToken: '',
  refreshToken: '',
  profileImgNum: '',
  isLogin: false,
};

export const getUserInfoAction = createAsyncThunk(
  'fetchUserInfo',
  async (userInfo, rejectWithValue) => getUserInfo(userInfo, rejectWithValue),
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder.addCase(getUserInfoAction.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getUserInfoAction.fulfilled, (state, action) => {
      // state = action.payload.userInfo; => 이렇게 해 주면 state가 update되지 않는다... ㅜㅜ => search!!
      return { ...action.payload.userInfo, status: 'success', isLogin: true };
    });
    builder.addCase(getUserInfoAction.rejected, (state, action) => {
      state.status = 'failed';
    });
  },
});

export default userSlice;
