"use client";
import { ListBlobResultBlob } from "@vercel/blob";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import { useState } from "react";
import { Modal } from "flowbite-react";
import { useRouter } from "next/navigation";

const customTheme = {
  root: {
    base: "absolute bottom-[1rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400",
    closed: "opacity-0 ease-out",
  },
  toggle: {
    base: "-m-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white",
    icon: "h-5 w-5 shrink-0",
  },
};

type DataProps = {
  blob: ListBlobResultBlob;
};

const DataCard = ({ blob }: DataProps) => {
  const [isToast, setIsToast] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const router = useRouter();

  const formattedTime = () => {
    let temp = blob.uploadedAt.toISOString().split("T");
    let date = temp[0].replaceAll("-", " ");
    let time = temp[1].split(".")[0].split(":").slice(0, 2).join(":");
    return date + " " + time;
  };

  const triggerModal = () => {
    setDeleteModal(true);
  };

  const closeModal = () => setDeleteModal(false);

  const handleClipboard = () => {
    navigator.clipboard.writeText(blob.url).then(function () {
      setIsToast(true);
      const timeoutId = setTimeout(() => {
        setIsToast(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    });
  };

  const handleDeleteData = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/interfaces/files", {
        method: "DELETE",
        body: JSON.stringify({ url: blob.url }),
      });
      setDeleteModal(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="p-2 bg-light rounded-lg flex flex-col">
        <button className="text-right self-end mb-2" onClick={triggerModal}>
          <IoMdClose color="red" />
        </button>
        <Image
          src={blob.url}
          alt={blob.pathname}
          width={300}
          height={300}
          className="bg-cover"
        />
        <div className="m-2">
          <div className="flex justify-between items-center font-bold text-center mb-2">
            <span>{blob.pathname}</span>
          </div>
          <div className="flex justify-between items-center descriptor-font">
            <span>Size</span>
            <span>{blob.size}</span>
          </div>
          <div className="flex justify-between items-center descriptor-font">
            <span>Uploaded at</span>
            <span>{formattedTime()}</span>
          </div>
          <div className="text-center">
            <button
              className="descriptor-font underline text-blue-500"
              onClick={handleClipboard}
            >
              Click to copy link
            </button>
          </div>
        </div>
      </div>
      {isToast && (
        <Toast theme={customTheme}>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">Copied to clipboard</div>
          <Toast.Toggle onDismiss={() => setIsToast((state) => !state)} />
        </Toast>
      )}
      <Modal show={deleteModal} onClose={closeModal}>
        <Modal.Header>You are trying to delete data!</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              You cannot cancel this event so be careful deleting data. Once you
              deleted one of them you cannot restore it and have to upload one
              more time.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="dashboard__button" onClick={closeModal}>
            Abort
          </button>
          <button
            onClick={handleDeleteData}
            className="dashboard__button bg-rose-500 hover:bg-rose-700"
          >
            Confirm delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DataCard;
