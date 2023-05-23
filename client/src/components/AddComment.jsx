import { useState } from 'react';
import StarRating from './StarRating';
import Button from './UI/Button';

function AddComment() {
  const [rating, setRating] = useState(0);
  const handleStarClick = star => {
    setRating(star);
  };
  return (
    <form className="flex flex-col items-end">
      <div className="w-full h-[12.5rem] bg-gray2 py-[24px] px-[30px] my-[38px]">
        <div className="flex pb-[18px] border-b-[1px] border-solid border-gray12">
          <StarRating rating={rating} onStarClick={handleStarClick} />
        </div>
        <textarea
          className="w-full h-[7rem] bg-gray2 pt-[18px] px-[10px] focus:outline-none resize-none "
          placeholder="댓글을 작성하세요"
          name="content"
          wrap="hard"
        />
      </div>
      <Button
        type="submit"
        className="w-[75px] h-[42px] bg-gray5 text-white text-[15px] font-medium"
      >
        등록
      </Button>
    </form>
  );
}

export default AddComment;
