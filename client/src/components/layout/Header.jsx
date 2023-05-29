import { NavLink, Link } from 'react-router-dom';
import { useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { UserIcon, SearchIcon } from '../Icons';
import { logout } from '../../api/auth';
import { reset } from '../../store/userSlice';

function Header({ isLogin }) {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const applyNavLinkActivedStyle = ({ isActive }) =>
    `p-[10px] pb-[15px] tracking-[.15rem] ${isActive && 'text-activeBlue'}`;

  const onFormFocusHandler = () => {
    inputRef.current.focus();
  };

  const onLogoutButtonClickHandler = () => logout(() => dispatch(reset()));

  return (
    <div className="z-10 fixed top-0 flex justify-center h-36 w-screen pt-6 bg-gray1 font-play text-[0.75rem] border-solid border-b-[1px] border-gray7/60">
      <div className="flex flex-col w-full max-w-limit">
        <div className="flex justify-end pr-[10px]">
          <Link to={isLogin ? '/user/profile' : '/user/login'} className="flex">
            <UserIcon className="h-[12px] w-[12px] mr-2" />
            <span className="tracking-[.15rem] mr-6">
              {isLogin ? 'MY PAGE' : 'LOGIN'}
            </span>
          </Link>
          {isLogin && (
            <button
              onClick={onLogoutButtonClickHandler}
              type="button"
              className="tracking-[.15rem]"
            >
              logout
            </button>
          )}
        </div>
        <div className="flex items-end">
          <Link to="/">
            <h1 className="text-2xl font-[900] font-noto-kr pr-14">
              <div className="mb-2">HELLO,</div>
              <div>DEVELOPER!</div>
            </h1>
          </Link>
          <form
            onClick={onFormFocusHandler}
            className="group flex w-full justify-between h-9 items-center bg-[#FFFFFF] py-3 px-5 mr-8 shadow-around rounded-3xl"
          >
            <SearchIcon className="h-[14px] w-[14px] mr-2" />
            <input
              ref={inputRef}
              className="w-full bg-transparent outline-none border-0 focus:ring-0"
              type="text"
              placeholder="Search"
            />
          </form>
          <nav className="flex">
            {/* <NavLink to="/" className={applyNavLinkActivedStyle}>
              HOME
            </NavLink> */}
            <NavLink to="/about" className={applyNavLinkActivedStyle}>
              ABOUT
            </NavLink>
            <NavLink to="/developments" className={applyNavLinkActivedStyle}>
              DEVELOPMENT
            </NavLink>
            <NavLink to="/equipment" className={applyNavLinkActivedStyle}>
              EQUIPMENT
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
