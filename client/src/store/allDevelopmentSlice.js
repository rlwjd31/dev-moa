/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDevelopment } from '../api/development';

export const addDevelopmentPostAction = createAsyncThunk(
  'addDevelopmentPost',
  async (newDevelopmentInfo, rejectWithValue) =>
    addDevelopment(newDevelopmentInfo, rejectWithValue),
);

const initialState = {
  status: 'loading',
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
