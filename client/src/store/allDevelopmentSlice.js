/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { addDevelopment, getAllDevelopments } from '../api/development';

export const getAllDevelopmentsAction = createAsyncThunk(
  'getAllDevelopments',
  async (_, rejectWithValue) => getAllDevelopments(_, rejectWithValue),
);

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
  popularDevelopments: [],
  realTimeDevelopments: [],
};

const allDevelopmentsSlice = createSlice({
  name: 'allDevelopments',
  initialState,
  reducers: {
    getPopularDevelopments: (state, _) => {
      console.log('state', current(state));
      const sortedWithPopular = [...state.data]
        .sort((a, b) => b.recommends - a.recommends)
        .slice(0, 3);
      console.log('sortedWithPopular', sortedWithPopular);
      state.popularDevelopments = sortedWithPopular;
    },
    getRealTimeDevelopments: (state, _) => {
      // TODO: 실시간은 추가 구현이 필요 => 임시적으로 random한 게시글로 넣기
      // const tmpIndices = [-1, -1, -1];
      // const randomIndices = Array(3)
      //   .fill(0)
      //   .map((v, index) => {
      //     let randomIndex = Math.floor(Math.random() * state.data.length);
      //     while (tmpIndices.includes(randomIndex)) {
      //       randomIndex = Math.floor(Math.random() * state.data.length);
      //     }
      //     tmpIndices[index] = randomIndex;
      //     return randomIndex;
      //   });
      // console.log('randomIndices', randomIndices);
      // const sortedWithRealTime = [
      //   state.data[(randomIndices[0], randomIndices[1], randomIndices[2])],
      // ];
      // console.log('sortedWithRealTime', sortedWithRealTime);
      // state.realTimeDevelopments = sortedWithRealTime;
      return state;
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllDevelopmentsAction.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getAllDevelopmentsAction.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    });
    builder.addCase(getAllDevelopmentsAction.rejected, (state, action) => {
      state.status = 'failed';
    });
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

export const { getPopularDevelopments, getRealTimeDevelopments } =
  allDevelopmentsSlice.actions;
export default allDevelopmentsSlice;
