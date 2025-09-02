import { createPortal } from "react-dom";

import { RxCrossCircled } from "react-icons/rx";

const Modal = ({ onOpen, onClose, children, isOpen }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className="absolute top-0 z-40 grid h-screen w-screen place-items-center backdrop-blur">
          <div className="relative z-50 mx-auto min-h-[200px] min-w-[80%] rounded-sm bg-white p-4">
            <div className="flex justify-end">
              <RxCrossCircled
                className="cursor-pointer text-2xl font-bold"
                onClick={onClose}
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root"),
  );
};

export default Modal;
