import { collection, getDocs, setDoc, query, where } from 'firebase/firestore';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { firebaseDB } from '../utils/firebaseApp';

// const comment = {
//   commentId: '',
//   postId: '',
//   author: '',
//   star: null,
//   contents: '',
//   createAt: '',
// };

export const getCommentList = async (_, isRejectedWithValue) => {
  console.log('댓글 가져오는 중...');
  const comments = [];
  const commentsCollection = collection(firebaseDB, 'comment');

  try {
    const commentsSnapshot = await getDocs(commentsCollection);
    commentsSnapshot.forEach(comment => comments.push(comment.data()));

    return { comments };
  } catch (err) {
    return isRejectedWithValue({ error: err.message });
  }
};

export default {};

// state -> react가 데이터를 가지고 있어서 rendering이 빠름
// state를 안 쓰면 편함.
