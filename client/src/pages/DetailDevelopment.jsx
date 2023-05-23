import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchAllDevelopmentsAction } from '../store/developmentSlice';

import { HeartIcon, StarIcon } from '../components/Icons';
import Tags from '../components/UI/Tags';
import DevComment from '../components/DevComment';
import AddComment from '../components/AddComment';
import Button from '../components/UI/Button';

function DetailDevelopment() {
  const { allDevelopments } = useSelector(state => state.developments);
  const { postId } = useParams();
  // const data = allDevelopments.data[0];
  const data = allDevelopments.data.filter(
    developInfo => developInfo.postId === +postId,
  )[0];

  const [year, month, day] = [
    data.createdAt.slice(0, 4),
    data.createdAt.slice(5, 7),
    data.createdAt.slice(8, 10),
  ];
  const createdAt = `${year}년 ${month}월 ${day}일`;
  return (
    <div className="flex flex-col">
      <div className="w-[1080px] flex flex-col border-b-[1px] border-solid pt-[90px] pb-[20px]">
        <div className="w-full flex justify-between">
          <h2 className="font-bold text-[40px] text-black3 ">{data.title}</h2>
          <div className="flex flex-col items-center">
            <button type="button">
              <HeartIcon className="w-[33px] h-[31px] border-gray5" />
            </button>
            <p className="text-[15p] font-normal text-gray5 pt-[18px]">
              {data.recommends}
            </p>
          </div>
        </div>
        <div className="flex py-[10px]">
          <p className="text-[16px] font-medium text-black3">{data.author.name}</p>
          <p className="px-[18px]">&#183;</p>
          <p className="font-normal text-[16px] text-gray6">{createdAt}</p>
        </div>
        <div className="top-3 flex justify-between py-[10px]">
          <div className="flex">
            <Tags tagName={data.sorta} className="bg-black3 text-white" />
            {data.tags.map((el, index) => (
              // eslint-disable-next-line no-undef, react/no-array-index-key
              <Tags key={index} tagName={el} />
            ))}
          </div>
          <div className="flex items-center">
            <Button className="text-gray5">수정</Button>
            <p className="px-[15px] text-gray5">|</p>
            <Button className="text-gray5">삭제</Button>
          </div>
        </div>
      </div>
      <div className="content border-b-[1px] border-solid">
        <Link target="_blank" to={data.sourceURL}>
          <img
            className="w-full h-[598px] my-[50px]"
            src={data.thumbnailImage}
            alt="썸네일 및 대표 사진"
          />
        </Link>
        <div className="flex">
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </div>
        <div className="w-full h-[191px] text-black3 text-20px font-normal mb-[18px]">
          {data.content}
        </div>
      </div>
      <div className="comment">
        <div className="flex items-center">
          <p className="py-[50px] text-[24px] text-black3 font-bold pr-[29px]">
            이 글의 총 평점
          </p>
          <p className="flex text-[24px] text-gray5 font-medium items-center">
            <StarIcon className="pr-[17px]" />
            {data.starAvg}
          </p>
        </div>
        <div>
          <p className="text-[20px] font-bold text-black3">
            리뷰하기 ({data.comments.length}){' '}
          </p>
          <AddComment />
          <div className="mb-[52px]">
            <DevComment />
            <DevComment />
            <DevComment />
          </div>
        </div>
      </div>
      <div className="my-[141px]">
        <h3 className="text-[24px] font-bold text-black1 mb-[50px]">
          이후에 보면 좋은 게시글{' '}
        </h3>
        {/* {realTimeRanking.data.map(info => (
          <Card key={info.postId} flexItemwidth="33%">
            <Item {...info} />
          </Card>
        ))} */}
      </div>
    </div>
  );
}

export default DetailDevelopment;
