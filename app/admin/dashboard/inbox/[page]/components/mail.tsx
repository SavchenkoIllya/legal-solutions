"use client";
import {
  changeMailStatus,
  deleteMail,
} from "@/app/api/interfaces/mails/mails.api";
import { Mail } from "@/app/api/interfaces/mails/types";
import { cn } from "@/app/utils/cn";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { mailStatus } from "./utils/mailStatus";

export default function MailCard({ mail }: { mail: Mail }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { refresh } = router;
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-[99]"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="relative max-w-lg flex flex-col gap-2 items-center rounded-md px-8 py-10 text-zinc-800 shadow-lg bg-white">
            <div
              className={cn(
                "absolute top-0 right-0 w-3 h-3 rounded-full mt-4 mr-2",
                mailStatus[mail.is_read].styles
              )}
            ></div>
            {/* FIXME: Fix this fucking piece of shit */}
            {/* <button
              onClick={() => {
                changeMailStatus(mail.id, "unread");
                setIsOpen(false);
                refresh();
              }}
              className="absolute top-0 left-0 mt-4 ml-2 text-blue-600 hover:underline"
            >
              Mark as unread
            </button> */}
            <DialogTitle className="font-bold">{mail.name}</DialogTitle>
            <Description className="flex justify-between w-full">
              <span>{mail.email}</span>
              <span>{mail.phone}</span>
            </Description>
            <p>{mail.comment}</p>
            <p>{mail.region}</p>
            <p>{mail.created_at?.toString()}</p>
            <div className="flex gap-4 mt-4">
              {mailStatus[mail.is_read].callback && (
                <button
                  className="dashboard__button__outlined"
                  onClick={async () => {
                    try {
                      await mailStatus[mail.is_read].callback?.(mail.id);
                      setIsOpen(false);
                      refresh();
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Mark as: {mailStatus[mail.is_read].next}
                </button>
              )}
              <button
                className="dashboard__button-decline"
                onClick={async () => {
                  await deleteMail(mail.id);
                  setIsOpen(false);
                  refresh();
                }}
              >
                <span className="mr-2">
                  <HiOutlineTrash color="white" size={20} />
                </span>
                <span>Delete</span>
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <button
        onClick={() => setIsOpen(true)}
        key={mail.id}
        className="relative group cursor mx-4 overflow-hidden rounded-2xl bg-white shadow-xl duration-200 hover:-translate-y-4 w-[300px]"
      >
        <div
          className={cn(
            "absolute top-0 right-0 w-3 h-3 rounded-full mt-4 mr-2",
            mailStatus[mail.is_read].styles
          )}
        ></div>
        <div className="flex-1 overflow-hidden bg-white px-6 py-8">
          <h5 className="group-hover:text-indigo-600 mb-4 text-xl font-bold">
            {mail.name}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3 overflow-hidden">
            {mail.comment}
          </p>
          <div className="flex justify-between">
            <p className="font-normal text-gray-700 dark:text-gray-400 descriptor-font">
              {mail.email}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400 descriptor-font">
              {mail.phone}
            </p>
          </div>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {mail.region}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400 descriptor-font">
            {mail.created_at?.toString()}
          </p>
        </div>
      </button>
    </>
  );
}
