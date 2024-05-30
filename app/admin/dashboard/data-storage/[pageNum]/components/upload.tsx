"use client";
import { Modal } from "flowbite-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function UploadButton() {
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file as Blob);

    const response = await fetch("/api/interfaces/files", {
      method: "POST",
      body: formData,
    });
    setOpenModal(false);
    router.refresh();
  };

  return (
    <>
      <button onClick={() => setOpenModal(true)} className="dashboard__button">
        Upload new
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleSubmit}
            type="submit"
            className="dashboard__button bg-green-500 hover:bg-green-600"
          >
            Save
          </button>
          <button
            type="button"
            className="dashboard__button bg-rose-500 hover:bg-rose-600"
            color="gray"
            onClick={() => setOpenModal(false)}
          >
            Decline
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
