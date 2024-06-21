"use client";
import { useState } from "react";
import Modal from "../../../components/modal/modal";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function UploadButton() {
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file as Blob);
    try {
      await fetch("/api/interfaces/files", {
        method: "POST",
        body: formData,
      }).then(() => {
        toast.success("uploaded successfully", {
          onClose: () => router.refresh(),
        });
      });
      toast("...uploading");
      setOpenModal(false);
    } catch (error) {
      toast.error("error occurred during uploading");
    }
  };

  return (
    <>
      <button onClick={() => setOpenModal(true)} className="dashboard__button">
        Upload new
      </button>
      <Modal
        cancelText="Cancel"
        confirmText="Save"
        callback={handleSubmit}
        setToggle={setOpenModal}
        title="Upload new picture"
        description={
          <form onSubmit={handleSubmit}>
            <label htmlFor="large-file-input" className="sr-only">
              Choose file
            </label>
            <input
              onChange={(e) => {
                setFile(e.target.files?.item(0) || null);
              }}
              type="file"
              name="large-file-input"
              id="large-file-input"
              className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                        file:bg-gray-50 file:border-0
                        file:me-4
                        file:py-3 file:px-4 file:sm:py-5
                        dark:file:bg-neutral-700 dark:file:text-neutral-400"
            />
          </form>
        }
        isOpened={openModal}
        confirmButtonStyles="bg-green-500 hover:bg-green-600"
      />
      <ToastContainer position="bottom-center" />
    </>
  );
}
