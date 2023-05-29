/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDevelopment } from '../api/development';

export const addDevelopmentPostAction = createAsyncThunk(
  'addDevelopmentPost',
  async (newDevelopmentInfo, rejectWithValue) =>
    addDevelopment(newDevelopmentInfo, rejectWithValue),
);

const initialState = {
  // status: 'loading'으로 초기값 처리하면 게시글을 추가하려고 페이지를 들어가면
  // 처음부터 'loading'이라 LoadingPage가 rendering되는 버그가 존재하므로
  // 초기값을 변경하여 해결
  status: 'initialStatus',
  data: [
    {
      id: '',
      content: '',
      sorta: '',
      sourceMedia: '',
      sourceURL: '',
      star: 0,
      tags: [],
      thumbnailImage: '',
      title: '',
      createdAt: '',
      modifiedAt: '',
      author: '',
      recommends: 0,
    },
  ],
};

const allDevelopmentsSlice = createSlice({
  name: 'allDevelopments',
  initialState,
  extraReducers: builder => {
    builder.addCase(addDevelopmentPostAction.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(addDevelopmentPostAction.fulfilled, (state, action) => {
      state.status = 'success';
      state.data.push(action.payload.newDevelopmentInfo);
    });
    builder.addCase(addDevelopmentPostAction.rejected, (state, action) => {
      state.status = 'failed';
    });
  },
});

export default allDevelopmentsSlice;
