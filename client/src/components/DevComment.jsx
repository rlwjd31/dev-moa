import { StarIcon } from './Icons';

function DevComment() {
  return (
    <div className="w-full border-b-[1px] border-solid border-gray12 py-[33px]">
      <div className="flex items-">
        <img className="w-[46px] h-[46px] rounded-full bg-gray4 mr-[12px]" />
        <div className="flex flex-col justify-between py-[5px]">
          <p className="text-[14px] text-black3 font-semibold">Hello231</p>
          <div className="flex items-center">
            <p className="flex mr-[11px]">
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </p>
            <p className="text-[12px] text-gray5 font-normal font-play">
              2023년 5월 15일
            </p>
          </div>
        </div>
      </div>
      <div className="text-[16px] text-gray5 font-medium pt-[33px]">
        우와 너무 유용해요 감사합니다 ㅎㅎ
      </div>
    </div>
  );
}

export default DevComment;
