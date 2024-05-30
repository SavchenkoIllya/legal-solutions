"use client";
import { Mail } from "@/app/api/interfaces/mails/types";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";

export default function MailCard({ mail }: { mail: Mail }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg flex flex-col items-center rounded-md nbn px-8 py-10 text-gray-800 shadow-lg">
            <DialogTitle className="font-bold">{mail.name}</DialogTitle>
            <Description className="flex justify-between w-full">
              <span>{mail.email}</span>
              <span>{mail.phone}</span>
            </Description>
            <p>{mail.comment}</p>
            <p>{mail.region}</p>
            <p>{mail.created_at?.toString()}</p>
            <div className="flex gap-4">
              <button
                className="dashboard__button-accept"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="dashboard__button-decline"
                onClick={() => setIsOpen(false)}
              >
                Deactivate
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <button
        onClick={() => setIsOpen(true)}
        key={mail.id}
        className="group cursor mx-4 overflow-hidden rounded-2xl bg-white shadow-xl duration-200 hover:-translate-y-4 w-[300px]"
      >
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
