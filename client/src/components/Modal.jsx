import React from 'react';

function Modal({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white py-[2.56rem] px-[3.75rem] w-[35.5rem]">
        <div className="text-2xl font-bold">회원정보수정</div>
        <div className="mt-12">
          <div className="py-[0.75rem]">
            <div className="text-base pb-[0.75rem]">이름</div>
            <input type="text" className="border border-#B0B0B0 w-[28rem] h-[2.2rem]" />
          </div>
          <div className="py-[0.75rem]">
            <div className="text-base pb-[0.75rem]">비밀번호</div>
            <input type="text" className="border border-#B0B0B0 w-[28rem] h-[2.2rem]" />
          </div>
          <div className="py-[0.75rem]">
            <div className="text-base pb-[0.75rem]">이메일</div>
            <input type="text" className="border border-#B0B0B0 w-[28rem] h-[2.2rem]" />
          </div>
          <div className="py-[0.75rem]">
            <div className="text-base pb-[0.75rem]">관심분야</div>
            <input type="text" className="border border-#B0B0B0 w-[28rem] h-[2.2rem]" />
          </div>
        </div>
        <div className="mt-[3.75rem] flex justify-center items-center">
          <button
            type="button"
            onClick={onClose}
            className="border border-gray8 w-[4.75rem] h-[3rem] text-sm mr-[1.375rem]"
          >
            취소
          </button>
          <button
            type="button"
            className="border border-gray8 w-[4.75rem] h-[3rem] text-sm"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
