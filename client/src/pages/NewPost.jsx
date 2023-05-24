import { useState } from 'react';

import StarRating from '../components/StarRating';
import ProfileLine from '../components/UI/ProfileLine';
import Tag from '../components/UI/Tag';
import Input from '../components/UI/Input';

function NewPost() {
  const [newPostInfo, setNewPostInfo] = useState({
    title: '',
    content: '',
    link: '',
    tags: { arr: [], value: '' },
    sorta: '',
    star: 0,
  });

  // const onStarClickHandler = starValue => setStar(prev => starValue);
  const onStarClickHandler = starValue =>
    setNewPostInfo(prev => ({ ...prev, star: starValue }));
  const onSortaClickHandler = newSortaValue =>
    setNewPostInfo(prev => ({ ...prev, sorta: newSortaValue }));
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
  const onLinkChangeHandler = e =>
    setNewPostInfo(prev => ({ ...prev, link: e.target.value }));

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
        <ProfileLine title="링크" content="링크를 입력하세요" className="px-7 py-7">
          <Input
            placeholder="링크를 입력하세요"
            className="w-full text-gray13 bg-gray1 outline-none"
            value={newPostInfo.link}
            onChangeHandler={onLinkChangeHandler}
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
                sorta === newPostInfo.sorta
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
    </div>
  );
}

export default NewPost;
