"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ListBlobResultBlob } from "@vercel/blob";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../../components/modal/modal";
import { IoMdClose } from "react-icons/io";

type DataProps = {
  blob: ListBlobResultBlob;
};

const DataCard = ({ blob }: DataProps) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const router = useRouter();

  const formattedTime = () => {
    let temp = blob.uploadedAt.toISOString().split("T");
    let date = temp[0].replaceAll("-", " ");
    let time = temp[1].split(".")[0].split(":").slice(0, 2).join(":");
    return date + " " + time;
  };

  const handleClipboard = () => {
    navigator.clipboard
      .writeText(blob.url)
      .then(() => toast.success("Copied to clipboard", { autoClose: 2000 }));
  };

  const handleDeleteData = async () => {
    try {
      const response = await fetch("/api/interfaces/files", {
        method: "DELETE",
        body: JSON.stringify({ url: blob.url }),
      });
      toast.success("Deleted", {
        autoClose: 2000,
        onClose: () => router.refresh(),
      });
    } catch (error) {
      toast.error("Failed deleting", { autoClose: 2000 });
    }
    setDeleteModal(false);
  };

  return (
    <>
      <div className="p-2 bg-light rounded-lg flex flex-col">
        <button
          className="text-right self-end mb-2"
          onClick={() => setDeleteModal(true)}
        >
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
            <span className="truncate">{blob.pathname}</span>
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
        <ToastContainer position="bottom-center" />
      </div>
      <Modal
        title="You are trying to delete data!"
        description="You cannot cancel this event so be careful deleting data. Once you
        deleted one of them you cannot restore it and have to upload one
        more time."
        isOpened={deleteModal}
        setToggle={setDeleteModal}
        callback={handleDeleteData}
      />
    </>
  );
};

export default DataCard;
