import { useState } from 'react';
import Modal from '../Modal';

function ProfileLine({ title, content }) {
  const [showModal, setShowModal] = useState(false);

  const handleOnClose = () => setShowModal(false);
  return (
    <div>
      <div className="w-full my-[34px] flex flex-initial ">
        <p className="font-medium text-[15px] w-[20%]">{title}</p>
        <p className="font-normal text-[15px] w-[80%]">{content}</p>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="w-[52px] h-[31px] text-[14px] text-black4 text-center font-medium border-[1px] border-solid border-gray4"
        >
          수정
        </button>
      </div>
      <Modal onClose={handleOnClose} visible={showModal} />
    </div>
  );
}

export default ProfileLine;
