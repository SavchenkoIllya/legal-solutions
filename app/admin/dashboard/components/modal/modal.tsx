"use client";
import { cn } from "@/app/utils/cn";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Dispatch, ReactNode, SetStateAction } from "react";

type ModalProps = {
  isOpened: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  callback?: (...args: any[]) => any | void;
  title?: string | undefined | ReactNode;
  description?: string | undefined | ReactNode;
  cancelText?: string | undefined | ReactNode;
  confirmText?: string | undefined | ReactNode;
  confirmButtonStyles?: string;
  cancelButtonStyles?: string;
  confirmButton?: ReactNode | undefined;
  cancelButton?: ReactNode | undefined;
};

export default function Modal({
  callback,
  title,
  description,
  isOpened,
  setToggle,
  cancelText = "Cancel",
  confirmText = "Delete",
  confirmButtonStyles = "",
  cancelButtonStyles = "",
  confirmButton = (
    <button
      className={cn("dashboard__button-decline", confirmButtonStyles)}
      onClick={() => {
        callback?.();
        setToggle(false);
      }}
    >
      {confirmText}
    </button>
  ),
  cancelButton = (
    <button
      className={cn("dashboard__button__outlined", cancelButtonStyles)}
      onClick={() => setToggle(false)}
    >
      {cancelText}
    </button>
  ),
}: ModalProps) {
  return (
    <Dialog
      open={isOpened}
      onClose={() => setToggle(false)}
      className="relative z-[99]"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg flex flex-col items-center rounded-md px-8 py-10 text-zinc-800 shadow-lg bg-white">
          {title && <DialogTitle className="font-bold">{title}</DialogTitle>}
          {description && (
            <Description className="flex justify-between w-full my-2">
              {description}
            </Description>
          )}
          <div className="flex gap-4">
            {cancelButton}
            {confirmButton}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
