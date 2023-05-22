import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HeartIcon, StarIcon } from '../components/Icons';
import {
  fetchAllDevelopmentsAction,
  fetchRealTimeDevelopmentsAction,
} from '../store/developmentSlice';

import DevComment from '../components/DevComment';
import AddComment from '../components/AddComment';
import Tags from '../components/UI/Tags';

function DetailDevelopment() {
  const [star, setStar] = useState([false, false, false, false, false]);
  const arr = [0, 1, 2, 3, 4];

  const { allDevelopments } = useSelector(state => state.developments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllDevelopmentsAction());
    dispatch(fetchRealTimeDevelopmentsAction());
  }, []);

  //postId 에 맞게 data 넣도록 만들기
  const data = allDevelopments.data[0];

  const handleStarClick = idx => {
    let starStates = [...star];
    for (let i = 0; i < 5; i++) {
      starStates[i] = i <= idx ? true : false;
    }
    setStar(starStates);
  };

  useEffect(() => {
    sendStarReview();
  }, [star]);

  const sendStarReview = () => {
    let starAvg = star.filter(Boolean).length;
  };

  return (
    <div className="flex flex-col">
      <div className="w-[1080px] flex flex-col border-b-[1px] border-solid pt-[90px] pb-[20px]">
        <div className="w-full flex justify-between">
          <h2 className="font-bold text-[40px] text-black3 ">{data.title}</h2>
          <div className="flex flex-col items-center">
            <button>
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
          <p className="font-normal text-[16px] text-gray6">{data.createdAt}</p>
        </div>
        <div className="top-3 flex justify-between py-[10px]">
          <div className="flex">
            {data.tags[0].tags.map(el => {
              <Tags tagName={el} />;
            })}
          </div>
          <div className="flex items-center">
            <button className="text-gray5">수정</button>
            <p className="px-[15px] text-gray5">|</p>
            <button className="text-gray5">삭제</button>
          </div>
        </div>
      </div>
      <div className="content border-b-[1px] border-solid">
        <a>
          <img className="w-full h-[598px] my-[50px]" />
        </a>
        <Stars>
          {arr.map((el, idx) => {
            return <StarIcon onClick={() => handleStarClick(el)} key={idx} />;
          })}
        </Stars>
        <div className="w-full h-[191px] text-black3 text-20px font-normal mb-[18px]">
          이 글을 보는데 쿠키에 대해서 너무 잘 설명되어 있어서 공유드립니다 :) <br />{' '}
          여러분들도 꼭 보셨으면 합니다!! <br /> 도움 되셨다면 하트 꾸욱~
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
          <p className="text-[20px] font-bold text-black3">리뷰하기 (3) </p>
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
        {realTimeRanking.data.map(info => (
          <Card key={info.postId} flexItemwidth="33%">
            <Item {...info} />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DetailDevelopment;
