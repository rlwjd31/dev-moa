// TODO: develop VS Prod mode에 따른 프로젝트 환경 셋팅

import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import axios from '../utils/axios';
import { firebaseDB } from '../utils/firebaseApp';

const popularRankingEndpoint = 'posts/popular-ranking';
const realTimeRankingEndpoint = 'posts/realtime-ranking';
const allDevelopmentEndpoint = 'posts';
// const popularRankingEndpoint = 'popularRanking';
// const realTimeRankingEndpoint = 'realTimeRanking';
// const allDevelopmentEndpoint = 'allDevelopments';

export const fetchPopularDevelopments = async (something, rejectWithValue) => {
  try {
    const response = await axios.get(popularRankingEndpoint);
    if (response.status >= 200 && response.status < 300) {
      return { popularRanking: response.data.data };
    }
  } catch (err) {
    return rejectWithValue({ error: err.message }); // rejectWithValue적용
  }

  return null;
};

export const fetchRealTimeDevelopments = async (something, rejectWithValue) => {
  try {
    const response = await axios.get(`${realTimeRankingEndpoint}`);

    if (response.status >= 200 && response.status < 300) {
      return { realTimeRanking: response.data.data };
    }
  } catch (err) {
    return rejectWithValue({ error: err.message }); // rejectWithValue적용
  }

  return null;
};

export const fetchAllDevelopments = async (_, rejectWithValue) => {
  try {
    const response = await axios.get(allDevelopmentEndpoint);
    if (response.status >= 200 && response.status < 300) {
      return { allDevelopments: response.data.data };
    }
  } catch (err) {
    return rejectWithValue({ error: err.message }); // rejectWithValue적용
  }

  return null;
};

export const addDevelopment = async (newDevelopmentInfo, rejectWithValue) => {
  try {
    const developmentDoc = await addDoc(
      collection(firebaseDB, 'development'),
      newDevelopmentInfo,
    );
    console.log(`✅ success!! development Doc id👉🏻`, developmentDoc.id);
  } catch (err) {
    return rejectWithValue({ error: err.message });
  }

  return null;
};

export const addDevelopmentPost = async (newDevelopmentInfo, rejectWithValue) => {
  // const copyNewPost = {
  //   ...newDevelopmentInfo,
  //   tags: newDevelopmentInfo.tags.arr,
  //   createdAt: new Date(),
  //   modifiedAt: new Date(),
  //   author:
  // };
  console.log(`보낸 데이터 👉🏻`, newDevelopmentInfo);
  try {
    // ! addDoc은 docId를 자동으로 생성해주지만 id자체도 직접 handling할 수 있게끔 data안에 넣고 싶어서
    // ! nanoId와 setDoc(docId를 직접 지정해주어야 함)을 이용함

    const developmentDoc = await setDoc(
      doc(firebaseDB, 'development', newDevelopmentInfo.id),
      newDevelopmentInfo,
    );
    console.log(`✅ success!! development Doc id👉🏻`, developmentDoc.id);
    return { newDevelopmentInfo };
    // console.log(developmentDoc.data());
  } catch (err) {
    console.log(err.message);
    return rejectWithValue({ error: err.message });
  }

  return null;
};

export default {};
