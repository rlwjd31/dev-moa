import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { HeartIcon, StarIcon } from '../components/Icons';
import Tag from '../components/UI/Tag';
import DevComment from '../components/DevComment';
import AddComment from '../components/AddComment';
import Button from '../components/UI/Button';
import LoadingPage from './LoadingPage';

function DetailDevelopment() {
  const {
    allDevelopments,
    allDevelopments: { status: isLoading },
  } = useSelector(state => state);
  const { postId } = useParams();
  // const data = allDevelopments.data[0];

  let devData = null;
  let createdAt = null;
  if (isLoading === 'success') {
    devData = { ...allDevelopments.data.filter(dev => dev.id === postId)[0] };

    const [year, month, day] = new Date(devData.createdAt)
      .toLocaleDateString()
      .replaceAll('.', '')
      .split(' ');
    createdAt = `${year}년 ${month}월 ${day}일`;
  }

  // console.log(year, month, day);
  // const createdAt = `${year}년 ${month}월 ${day}일`;
  return (
    <>
      {isLoading === 'loading' && <LoadingPage />}
      {isLoading === 'success' && (
        <div className="flex flex-col">
          <div className="w-[1080px] flex flex-col border-b-[1px] border-solid pt-[90px] pb-[20px]">
            <div className="w-full flex justify-between">
              <h2 className="font-bold text-[40px] text-black3 ">{devData.title}</h2>
              <div className="flex flex-col items-center">
                <button type="button">
                  <HeartIcon className="w-[33px] h-[31px] border-gray5" />
                </button>
                <p className="text-[15p] font-normal text-gray5 pt-[18px]">
                  {devData.recommends}
                </p>
              </div>
            </div>
            <div className="flex py-[10px]">
              <p className="text-[16px] font-medium text-black3">{devData.author.name}</p>
              <p className="px-[18px]">&#183;</p>
              <p className="font-normal text-[16px] text-gray6">{createdAt}</p>
            </div>
            <div className="top-3 flex justify-between py-[10px]">
              <div className="flex">
                <Tag tagName={devData.sorta} className="bg-black3 text-white" />
                {devData.tags.map((el, index) => (
                  // eslint-disable-next-line no-undef, react/no-array-index-key
                  <Tag key={index} tagName={el} />
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
            <Link target="_blank" to={devData.sourceURL}>
              <img
                className="w-full h-[598px] my-[50px]"
                src={devData.thumbnailImage}
                alt="썸네일 및 대표 사진"
              />
            </Link>
            <div className="flex justify-start mb-10 gap-1">
              <p className="flex justify-center text-[24px] text-[#7199ff]">&#9733;</p>
              <p className="flex justify-center text-[24px] text-[#7199ff]">&#9733;</p>
              <p className="flex justify-center text-[24px] text-[#7199ff]">&#9733;</p>
              <p className="flex justify-center text-[24px] text-[#7199ff]">&#9733;</p>
              <p className="flex justify-center text-[24px] text-[#7199ff]">&#9733;</p>
            </div>
            <div className="w-full h-[191px] text-black3 text-20px font-normal mb-[18px]">
              {devData.content}
            </div>
          </div>
          <div className="comment">
            <div className="flex items-center">
              <p className="py-[50px] text-[24px] text-black3 font-bold pr-[29px]">
                이 글의 총 평점
              </p>
              <div className="flex">
                <p className="text-[24px] text-[#7199ff] pr-[17px]">&#9733;</p>
                <p className="flex text-[24px] text-gray5 font-medium items-center">
                  {devData.starAvg}
                </p>
              </div>
            </div>
            <div>
              <p className="text-[20px] font-bold text-black3">
                리뷰하기 ({devData?.comments?.length || 0}){' '}
              </p>
              <AddComment />
              <div className="mb-[52px]">
                {devData?.comments?.map((el, idx) => (
                  <DevComment key={idx} commentInfo={el} />
                ))}
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
      )}
    </>
  );
}

export default DetailDevelopment;
