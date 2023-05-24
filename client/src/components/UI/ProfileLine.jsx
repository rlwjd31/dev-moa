import { useState } from 'react';
import Modal from '../Modal';

function ProfileLine({ title, content, className, children }) {
  // const [showModal, setShowModal] = useState(false);

  // const handleOnClose = () => setShowModal(false);
  const contentStyle = `w-full flex flex-initial ${className}`;
  return (
    <div className={contentStyle}>
      <p className="text-base text-black3 font-medium text-[15px] w-[20%]">{title}</p>
      <div className="w-full flex justify-start items-center">{children}</div>
      {/* <button
          type="button"
          onClick={() => setShowModal(true)}
          className="w-[52px] h-[31px] text-[14px] text-black4 text-center font-medium border-[1px] border-solid border-gray4"
        >
          수정
        </button> */}
    </div>
  );
}

export default ProfileLine;
// <Modal onClose={handleOnClose} visible={showModal} />
