// TODO: develop VS Prod mode에 따른 프로젝트 환경 셋팅

import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { firebaseDB } from '../utils/firebaseApp';

// * collection이 development에 해당하는 모든 doc들 가져오기
// * 모든 개발 게시글들을 패칭
export const getAllDevelopments = async (_, rejectWithValue) => {
  const allDevelopments = [];
  const allDevelopmentsCollection = collection(firebaseDB, 'development');

  try {
    const allDevelopmentsSnapshot = await getDocs(allDevelopmentsCollection);
    allDevelopmentsSnapshot.forEach(devDoc => allDevelopments.push(devDoc.data()));

    return allDevelopments;
  } catch (err) {
    console.log('getAllDevelopments Error!!❌', err.message);
    return rejectWithValue({ error: err.message }); // rejectWithValue적용
  }
};

export const addDevelopment = async (newDevelopmentInfo, rejectWithValue) => {
  try {
    // ! addDoc은 docId를 자동으로 생성해주지만 id자체도 직접 handling할 수 있게끔 data안에 넣고 싶어서
    // ! nanoId와 setDoc(docId를 직접 지정해주어야 함)을 이용함
    // can access developmentDoc.data() & developmentDoc.id
    const developmentDoc = await setDoc(
      doc(firebaseDB, 'development', newDevelopmentInfo.id),
      newDevelopmentInfo,
    );

    // action.payload
    return { newDevelopmentInfo };
  } catch (err) {
    console.log(err.message);
    return rejectWithValue({ error: err.message });
  }
};

export default {};
