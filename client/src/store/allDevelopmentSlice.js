/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDevelopmentPost } from '../api/development';

export const addDevelopmentPostAction = createAsyncThunk(
  'addDevelopmentPost',
  async (newDevelopmentInfo, rejectWithValue) =>
    addDevelopmentPost(newDevelopmentInfo, rejectWithValue),
);

const initialState = {
  status: 'loading',
  data: [
    {
      userId: '',
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
      console.log(action.payload.newDevelopmentInfo);
      state.data.push(action.payload.newDevelopmentInfo);
    });
    builder.addCase(addDevelopmentPostAction.rejected, (state, action) => {
      state.status = 'failed';
    });
  },
});

export default allDevelopmentsSlice;
