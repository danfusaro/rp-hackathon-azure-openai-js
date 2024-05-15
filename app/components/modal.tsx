// Modal.tsx
import React, { FC, ReactNode } from "react";
import { Button } from "./button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  buttonText?: string;
  hideButton?: boolean;
}

const Modal: FC<React.PropsWithChildren<ModalProps>> = ({
  isOpen,
  onClose,
  children,
  buttonText,
  hideButton,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity ease-in-out duration-500 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-black rounded-lg max-w-2xl flex flex-col justify-between">
        <div className="p-8">{children}</div>
        {!hideButton && (
          <div className="self-end m-4">
            <Button onClick={onClose}>{buttonText ?? "Close"}</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
