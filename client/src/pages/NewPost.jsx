import { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import { redirect, useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';
import ProfileLine from '../components/UI/ProfileLine';
import Tag from '../components/UI/Tag';
import Input from '../components/UI/Input';
import axios from '../utils/axios';
import convertToBase64 from '../utils/convertToBase64';

function NewPost() {
  const [newPostInfo, setNewPostInfo] = useState({
    title: '',
    content: '',
    tags: { arr: [], value: '' },
    sorta: '',
    star: 0,
    memberId: 1, // 임의
    sourceMedia: 'velog', // 임의
    thumbnailImage: '', // 임의
    sourceURL: 'https://velog.io/@codren/%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B8%B0%EB%8A%A5', // 임의
  });
  const navigate = useNavigate();
  const imageFileTypes = ['JPEG', 'PNG', 'GIF'];
  // const [newPostInfo, setNewPostInfo] = useState({
  //   title: '',
  //   content: '',
  //   tags: { arr: [], value: '' },
  //   sorta: '',
  //   star: 0,
  //   memberId: 1, // 임의
  //   sourceMedia: 'velog', // 임의
  //   thumbnailImage: 'https://images.velog.io/velog.png', // 임의
  //   sourceURL: 'https://velog.io/@codren/%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B8%B0%EB%8A%A5', // 임의
  // });

  // const onStarClickHandler = starValue => setStar(prev => starValue);
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
  // const onImageChangeHandler = async image => {
  //   const imageFile = image[0];
  //   const base64Image = await convertToBase64(imageFile);
  //   setNewPostInfo(prev => ({ ...prev, thumbnailImage: base64Image }));
  //   console.log('imageFile 👉🏻', imageFile);
  //   console.log('base64Image 👇', base64Image);
  // };

  const onThumbnailChangeHandler = e =>
    setNewPostInfo(prev => ({ ...prev, thumbnailImage: e.target.value }));

  const onAddNewPostClickHandler = async () => {
    const copyNewPost = { ...newPostInfo, tags: newPostInfo.tags.arr };
    console.log('보낸 데이터 👉🏻', copyNewPost);
    try {
      const addNewDevelopmentPost = await axios.post('posts', copyNewPost);
      if (addNewDevelopmentPost.status >= 200 && addNewDevelopmentPost.status < 300) {
        console.log('✅ success!!', addNewDevelopmentPost.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log(newPostInfo);

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
            {/* <FileUploader
              multiple
              handleChange={onImageChangeHandler}
              name="file"
              types={imageFileTypes}
            /> */}
            <Input
              placeholder="썸네일을 입력하세요"
              className="w-full text-gray13 bg-gray1 outline-none"
              value={newPostInfo.thumbnailImage}
              onChangeHandler={onThumbnailChangeHandler}
            />
            {/* <p className="mt-4">
              {!newPostInfo.thumbnailImage && '이미지를 올려주세요😄'}
            </p> */}
            {newPostInfo.thumbnailImage && (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img
                className="mt-4"
                src={`${newPostInfo.thumbnailImage}`}
                alt="uploaded image"
              />
            )}
          </div>
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
