import { StarIcon } from './Icons';

function DevComment({ key, commentInfo }) {
  const starNum = [1, 2, 3, 4, 5];
  const rating = commentInfo.star;

  const [year, month, day] = [
    commentInfo.createdAt.slice(0, 4),
    commentInfo.createdAt.slice(5, 7),
    commentInfo.createdAt.slice(8, 10),
  ];
  const commentCreatedAt = `${year}년 ${month}월 ${day}일`;

  return (
    <div key={key} className="w-full border-b-[1px] border-solid border-gray12 py-[33px]">
      <div className="flex items-">
        <img className="w-[46px] h-[46px] rounded-full bg-gray4 mr-[12px]" />
        <div className="flex flex-col justify-between py-[5px]">
          <p className="text-[14px] text-black3 font-semibold">
            {commentInfo.author.name}
          </p>
          <div className="flex items-center">
            <p className="flex mr-[11px]">
              {starNum.map(star => (
                <span
                  key={star}
                  className={
                    star <= rating
                      ? 'text-[14px] text-[#7199ff]'
                      : 'text-[14px] text-[#c3c3c3]'
                  }
                >
                  &#9733;
                </span>
              ))}
            </p>
            <p className="text-[12px] text-gray5 font-normal font-play">
              {commentCreatedAt}
            </p>
          </div>
        </div>
      </div>
      <div className="text-[16px] text-gray5 font-medium pt-[33px]">
        {commentInfo.comment}
      </div>
    </div>
  );
}

export default DevComment;
