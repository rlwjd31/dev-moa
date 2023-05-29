import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';

import { useDispatch, useSelector } from 'react-redux';
import StarRating from '../components/StarRating';
import ProfileLine from '../components/UI/ProfileLine';
import Tag from '../components/UI/Tag';
import Input from '../components/UI/Input';
import { firebaseDB } from '../utils/firebaseApp';
import { addDevelopmentPostAction } from '../store/allDevelopmentSlice';

// form 관련 라이브러리 -> react hook 또는 다른 라이브러리
// render tree
// usestate 값 유지되는 것?
function NewPost() {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user);
  const [newPostInfo, setNewPostInfo] = useState({
    title: 'jwt기반 로그인 인증',
    content:
      'jwt 기반 로그인을 배울 수 있으며, accessToken refreshToken을 어디에 저장하며 저장할 시 생길 수 있는 props and cops를 알 수 있습니다',
    tags: { arr: [], value: '' },
    sorta: '',
    star: 0,
    // TODO: userId mapping 필요!!
    sourceMedia: 'velog', // 임의
    thumbnailImage:
      'https://velog.velcdn.com/images/_woogie/post/800da4e3-30e7-4211-a46d-f3f9a0eab81c/jwt.jpg', // 임의
    sourceURL:
      'https://velog.io/@_woogie/JWT-%EB%A1%9C%EA%B7%B8%EC%9D%B8%EB%B0%A9%EC%8B%9D-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-feat.-session%EC%97%90%EC%84%9C-jwt%EB%A1%9C', // 임의
    createdAt: '',
    modifiedAt: '',
    // ! Error log: 아래와 같이 state tookit에 있는 것에 초기값으로 설정하면 빈 값이 들어오는데
    // ! 이는 코드의 순서와 같이 순차적으로 state를 가져오지 않는 것 같다.
    author: '',
  });

  const onStarClickHandler = starValue =>
    setNewPostInfo(prev => ({ ...prev, star: starValue }));
  const onSortaClickHandler = newSortaValue => {
    let tmpSortaValue = '';

    if (newSortaValue === '글') {
      tmpSortaValue = 'text';
    } else if (newSortaValue === '영상') {
      tmpSortaValue = 'video';
    } else if (newSortaValue === '트렌드') {
      tmpSortaValue = 'trend';
    }
    setNewPostInfo(prev => ({ ...prev, sorta: tmpSortaValue }));
  };

  const onTagsInputKeyDownHandler = e => {
    if (e.key === 'Enter') {
      setNewPostInfo(prev => ({
        ...prev,
        tags: {
          arr: [...prev.tags.arr, e.target.value],
          value: '', // tag입력(Enter 시) 빈 값으로 초기화
        },
      }));
    }

    return null;
  };

  const onTagsInputChangeHandler = e =>
    setNewPostInfo(prev => ({
      ...prev,
      tags: {
        ...prev.tags,
        value: e.target.value,
      },
    }));

  const onTitleChangeHandler = e =>
    setNewPostInfo(prev => ({ ...prev, title: e.target.value }));
  const onContentChangeHandler = e =>
    setNewPostInfo(prev => ({ ...prev, content: e.target.value }));
  const onSourceURLChangeHandler = e =>
    setNewPostInfo(prev => ({ ...prev, sourceURL: e.target.value }));
  const onSourceMediaChangeHandler = e =>
    setNewPostInfo(prev => ({ ...prev, sourceMedia: e.target.value }));

  const onThumbnailChangeHandler = e =>
    setNewPostInfo(prev => ({ ...prev, thumbnailImage: e.target.value }));

  const onAddNewPostClickHandler = async () => {
    const copyNewPostInfo = {
      ...newPostInfo,
      createdAt: new Date().toString(),
      modifiedAt: new Date().toString(),
      author: {
        id: userInfo.id,
        name: userInfo.name,
        profileImage: userInfo.profileImage,
      },
      tags: newPostInfo.tags.arr,
      id: nanoid(),
    };
    dispatch(addDevelopmentPostAction(copyNewPostInfo));
  };

  return (
    <div className="w-full mt-main-top flex flex-col">
      <h2>
        <span className="border-b-[3px] border-solid pb-3 border-black3 font-bold text-xl">
          글 쓰기
        </span>
      </h2>
      <div className="py-12">
        <ProfileLine
          title="제목"
          content="제목을 입력하세요"
          className="px-7 py-7 border-b-[1px] border-solid border-gray13"
        >
          <Input
            placeholder="제목을 입력하세요"
            className="w-full text-gray13 bg-gray1 outline-none"
            value={newPostInfo.title}
            onChangeHandler={onTitleChangeHandler}
          />
        </ProfileLine>
        <ProfileLine
          title="내용"
          content="추천하게 된 이유를 설명해주세요"
          className="items-start px-7 py-7 border-b-[1px] border-solid border-gray13"
        >
          <textarea
            className="flex items-center w-full text-gray13 bg-gray1 outline-none h-[14rem]"
            placeholder="추천하게 된 이유를 설명해주세요"
            value={newPostInfo.content}
            onChange={onContentChangeHandler}
          />
        </ProfileLine>
        <ProfileLine title="썸네일" content="링크를 입력하세요" className="px-7 py-7">
          <div className="flex flex-col items-center">
            <Input
              placeholder="썸네일을 입력하세요"
              className="w-full text-gray13 bg-gray1 outline-none"
              value={newPostInfo.thumbnailImage}
              onChangeHandler={onThumbnailChangeHandler}
            />
            {newPostInfo.thumbnailImage && (
              <img
                className="mt-4"
                src={`${newPostInfo.thumbnailImage}`}
                alt="uploaded thumbnail"
              />
            )}
          </div>
        </ProfileLine>
        <ProfileLine title="매체" content="매체를 입력하세요" className="px-7 py-7">
          <Input
            placeholder="링크를 입력하세요"
            className="w-full text-gray13 bg-gray1 outline-none"
            value={newPostInfo.sourceMedia}
            onChangeHandler={onSourceMediaChangeHandler}
          />
        </ProfileLine>
        <ProfileLine title="링크" content="링크를 입력하세요" className="px-7 py-7">
          <Input
            placeholder="링크를 입력하세요"
            className="w-full text-gray13 bg-gray1 outline-none"
            value={newPostInfo.sourceURL}
            onChangeHandler={onSourceURLChangeHandler}
          />
        </ProfileLine>
        <ProfileLine title="태그" content="태그를 입력하세요" className="px-7 py-7">
          {newPostInfo.tags.arr.map((tagName, index) => (
            <Tag
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              onClick={() => {}}
              tagName={tagName}
              className="text-black3 bg-white"
            />
          ))}
          <Input
            placeholder="태그를 입력하세요"
            className="w-full text-gray13 bg-gray1 outline-none"
            onChangeHandler={onTagsInputChangeHandler}
            onKeyDownHandler={onTagsInputKeyDownHandler}
            value={newPostInfo.tags.value}
          />
        </ProfileLine>
        <ProfileLine title="종류" content="" className="px-7 py-7">
          {['글', '영상', '트렌드'].map(sorta => (
            <Tag
              onClick={onSortaClickHandler}
              key={sorta}
              tagName={sorta}
              className={
                { 글: 'text', 영상: 'video', 트렌드: 'trend' }[sorta].toString() ===
                newPostInfo.sorta.toString()
                  ? 'bg-black3 text-white'
                  : 'bg-white text-black3'
              }
            />
          ))}
        </ProfileLine>
        <ProfileLine
          title="별점"
          content="별점"
          className="px-7 py-7 border-b-[1px] border-solid border-gray13"
        >
          <StarRating rating={newPostInfo.star} onStarClick={onStarClickHandler} />
        </ProfileLine>
      </div>
      <div className="w-full flex justify-center items-center mb-7">
        <button
          type="button"
          className="border border-gray8 w-[4.75rem] h-[3rem] text-sm mr-[1.375rem]"
        >
          취소
        </button>
        <button
          type="button"
          className="border border-gray8 w-[4.75rem] h-[3rem] text-sm"
          onClick={onAddNewPostClickHandler}
        >
          등록
        </button>
      </div>
    </div>
  );
}

export default NewPost;
