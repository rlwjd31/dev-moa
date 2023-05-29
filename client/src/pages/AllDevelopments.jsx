import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import Aside from '../components/layout/Aside';
import Card from '../components/UI/Card';
import Item from '../components/Item';
import Button from '../components/UI/Button';
import Accordian from '../components/UI/Accordian';
import { fetchAllDevelopmentsAction } from '../store/developmentSlice';
import { ChevronDownIcon, PencilIcon } from '../components/Icons';
import Pagination from '../components/UI/Paginations';

function AllDevelopments() {
  const { allDevelopments } = useSelector(state => state.developments);
  const dispatch = useDispatch();
  const [filterValue, setFilterValue] = useState({
    tag: 'All',
    sorta: 'All',
    best: '최신순',
  });
  const [accordianVisible, setAccordianVisible] = useState(false);
  const [paginationValue, setPaginationValue] = useState(1);
  const navigator = useNavigate();
  const { user } = useSelector(state => state);

  const onSortaButtonClickHandler = e =>
    setFilterValue(prev => ({ ...prev, sorta: e.target.value }));

  const onAccordianFilterVisibleClickHandler = () => setAccordianVisible(prev => !prev);

  const onBestFilterClickHandler = value => {
    setFilterValue(prev => ({ ...prev, best: value }));
    // accordian에서 필터 값을 클릭한다면 accordian접기
    setAccordianVisible(false);
  };

  // ! Link의 to property가 동작하기 이전에 preventDefault로 이동하기 전에 action을 취할 수 있다.
  const onNewDevelopmentClickHandler = async e => {
    e.preventDefault();

    if (!user.isLogin) {
      const alertResult = await Swal.fire({
        showDenyButton: true,
        denyButtonText: '취소',
        title: '로그인이 필요한 서비스입니다 🥲',
        confirmButtonText: '확인',
      });

      if (alertResult.isConfirmed) {
        navigator('/user/login');
        return;
      }

      if (alertResult.isDenied) {
        return;
      }
      return;
    }

    navigator('/developments/new');
  };

  const onPaginationButtonClickHandler = pageValue => setPaginationValue(pageValue);

  const activeStyle = 'bg-black3 text-white1';
  const notActiveStyle = 'bg-white1 text-black3';

  useEffect(() => {
    dispatch(fetchAllDevelopmentsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredDevelopments = allDevelopments.data
    .filter(developmentInfo =>
      filterValue.tag === 'All'
        ? true
        : developmentInfo.tags
            .map(v => v.toLowerCase())
            .includes(filterValue.tag.toLowerCase()),
    )
    .filter(developmentInfo =>
      filterValue.sorta === 'All'
        ? true
        : developmentInfo.sorta.toLowerCase() === filterValue.sorta.toLowerCase(),
    );
  // TODO: sort로직 구현해야 됨.

  const paginationConfig = {
    pagePerView: 12,
    activeColor: 'text-activeBlue',
    postTotalLength: filteredDevelopments.length,
    paginationValue,
    onPaginationButtonClickHandler,
  };

  return (
    <>
      <section>
        <Aside
          title="Tech Stack"
          categories={{
            titles: [
              'All',
              'Js',
              'Ts',
              'Authentication',
              'Webpack',
              'Css-in-js',
              'React',
              'Vue',
              'Angular',
              'Nextjs',
              'Database',
              'Network',
              'Algorithm',
            ],
          }}
          activeValue={filterValue.tag}
          onFilterClickHandler={activeValue =>
            setFilterValue(prev => ({ ...prev, tag: activeValue }))
          }
        />
      </section>
      <section className="w-full pt-28">
        <div className="sticky top-36 flex flex-col pt-8 bg-gray1">
          <div className="relative flex justify-between">
            <div className="flex gap-2">
              {['All', 'Text', 'Video', 'Trend'].map((sortaValue, index) => (
                <Button
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  value={sortaValue}
                  onClick={e => onSortaButtonClickHandler(e)}
                  className={`text-xs px-3 py-1 border-[1px] border-solid border-gray8 rounded-2xl ${
                    filterValue.sorta === sortaValue ? activeStyle : notActiveStyle
                  }`}
                >
                  {sortaValue}
                </Button>
              ))}
            </div>
            <div className="absolute top-0 right-0 flex flex-col border-[1px] border-gray6 border-solid text-[0.625rem] cursor-pointer">
              <Button onClick={onAccordianFilterVisibleClickHandler}>
                <span className="p-2">{filterValue.best}</span>{' '}
                <ChevronDownIcon className="mr-2" />
              </Button>
              <Accordian
                onClickHandler={onBestFilterClickHandler}
                activeValue={filterValue.best}
                itemList={['최신순', '인기순']}
                className="border-t-[1px] p-2 border-gray6 border-solid"
                activeColor="text-activeBlue"
                visible={accordianVisible}
              />
            </div>
          </div>
          <h3 className="flex items-center text-[1.2rem] mt-5 border-b-[1px] border-solid border-gray4">
            <Link
              to="/developments/new"
              onClick={onNewDevelopmentClickHandler}
              className="flex w-32 py-7 pr-4"
            >
              <PencilIcon className="w-5 h-5 mr-3" />
              <span className="font-bold">글 쓰기</span>
            </Link>
          </h3>
        </div>
        <div className="w-full flex flex-col max-w-limit">
          <div className="w-full flex justify-start flex-wrap gap-6 py-8">
            {filteredDevelopments
              .slice(
                (paginationValue - 1) * paginationConfig.pagePerView,
                paginationValue * paginationConfig.pagePerView,
              )
              .map(info => (
                <Card key={info.postId} flexItemwidth="31%">
                  <Item {...info} />
                </Card>
              ))}
          </div>
        </div>
        <div className="flex justify-center pt-4 pb-20">
          <Pagination {...paginationConfig} />
        </div>
      </section>
    </>
  );
}

export default AllDevelopments;
