"use client";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Dispatch, ReactNode, SetStateAction } from "react";

type ModalProps = {
  callback: (...args: any[]) => any | void;
  isOpened: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  title?: string | undefined;
  description?: string | undefined | ReactNode;
};

export default function Modal({
  callback,
  title,
  description,
  isOpened,
  setToggle,
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
            <button
              className="dashboard__button__outlined"
              onClick={() => setToggle(false)}
            >
              Cancel
            </button>
            <button
              className="dashboard__button-decline"
              onClick={() => {
                callback?.();
                setToggle(false);
              }}
            >
              Delete
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
