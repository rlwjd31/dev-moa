import { useState } from 'react';
import StarRating from '../components/StarRating';
import ProfileLine from '../components/UI/ProfileLine';
import Tags from '../components/UI/Tags';

function NewPost() {
  const [star, setStar] = useState(0);
  const [tags, setTags] = useState([]);

  const onStarClickHandler = starValue => setStar(prev => starValue);
  const onTagsClickHandler = newTag => setTags(prev => [...prev, newTag]);

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
          <input
            className="w-full text-gray13 bg-gray1 outline-none"
            placeholder="제목을 입력하세요"
          />
        </ProfileLine>
        <ProfileLine
          title="내용"
          content="추천하게 된 이유를 설명해주세요"
          className="items-start px-7 py-7 border-b-[1px] border-solid border-gray13"
        >
          <textarea
            className="flex items-center w-full text-gray13 bg-gray1 outline-none h-[15rem]"
            placeholder="추천하게 된 이유를 설명해주세요"
          />
        </ProfileLine>
        <ProfileLine title="링크" content="링크를 입력하세요" className="px-7 py-7">
          <input
            className="w-full text-gray13 bg-gray1 outline-none"
            placeholder="제목을 입력하세요"
          />
        </ProfileLine>
        <ProfileLine title="태그" content="태그를 입력하세요" className="px-7 py-7">
          <input
            className="w-full text-gray13 bg-gray1 outline-none"
            placeholder="태그를 입력하세요"
          />
        </ProfileLine>
        <ProfileLine title="종류" content="" className="px-7 py-7">
          {['글', '영상', '트렌드'].map((sorta, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Tags key={index} tagName={sorta} className="bg-black3 text-white" />
          ))}
        </ProfileLine>
        <ProfileLine
          title="별점"
          content="별점"
          className="px-7 py-7 border-b-[1px] border-solid border-gray13"
        >
          <StarRating rating={star} onStarClick={onStarClickHandler} />
        </ProfileLine>
      </div>
    </div>
  );
}

export default NewPost;
