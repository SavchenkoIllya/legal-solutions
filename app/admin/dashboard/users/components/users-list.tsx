"use client";
import { User } from "@/app/api/interfaces/users/types";
import { Spinner } from "flowbite-react";
import EditIcon from "../../components/icons/edit-icon";
import DeleteIcon from "../../components/icons/delete-icon";
import { useState, useRef } from "react";
import { HiCheck } from "react-icons/hi";
import { deleteUser, updateUser } from "@/app/api/interfaces/users/users.api";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

type DefaultFormStates = "untouched" | "loading" | "editing";

export function UserList({ users }: { users: User[] }) {
  if (!users.length) return <p>No users at this moment</p>;

  const [formState, setFormState] = useState<DefaultFormStates>("untouched");
  const [error, setError] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const editNameRef = useRef<HTMLParagraphElement | null>(null);
  const editEmailRef = useRef<HTMLParagraphElement | null>(null);
  const router = useRouter();

  const handleEdit = () => {
    setFormState("editing");
  };

  const handleSubmitChanges = async (id: number) => {
    setFormState("loading");
    const email = editEmailRef.current?.textContent;
    const name = editNameRef.current?.textContent;

    if (email && name) {
      try {
        await updateUser(id, { name, email }).then(() => {
          setFormState("untouched");
        });
      } catch (error) {
        setError(String(error));
      }
    }
  };

  const triggerModal = () => {
    setDeleteModal(true);
  };

  const closeModal = () => setDeleteModal(false);

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id).then(() => {
        closeModal();
        signOut();
        router.refresh();
      });
    } catch (error) {
      closeModal();
      setError(String(error));
    }
  };

  return users.map((user) => (
    <>
      <Dialog
        key={user.id}
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg flex flex-col items-center rounded-md nbn px-8 py-10 text-zinc-800 shadow-lg">
            <DialogTitle className="font-bold">
              You are trying to delete user!
            </DialogTitle>
            <Description className="flex justify-between w-full my-2">
              You cannot cancel this event so be careful deleting users. Once
              you deleted one of them you cannot restore it and have to create
              new user account.
            </Description>
            <div className="flex gap-4">
              <button
                className="dashboard__button__outlined"
                onClick={() => setDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="dashboard__button-decline"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <tr key={user.id} className="border-x border-zinc-200">
        <td className="border-b border-zinc-200 bg-white px-5 py-5 text-sm">
          <p className="whitespace-no-wrap">{user.id}</p>
        </td>
        <td className="border-b border-zinc-200 bg-white px-5 py-5 text-sm">
          <div className="flex items-center">
            <div className="">
              <p
                ref={editNameRef}
                contentEditable={formState !== "editing" ? false : true}
              >
                {user.name}
              </p>
            </div>
          </div>
        </td>
        <td className="border-b border-zinc-200 bg-white px-5 py-5 text-sm">
          <p className="whitespace-no-wrap">
            <p
              ref={editEmailRef}
              contentEditable={formState !== "editing" ? false : true}
            >
              {user.email}
            </p>
          </p>
        </td>
        <td className="border-b border-zinc-200 bg-white px-5 py-5 text-sm">
          <p className="whitespace-no-wrap">
            <div className="space-x-4 flex items-center">
              {formState === "untouched" && (
                <EditIcon onClick={handleEdit} className="hover:scale-110" />
              )}
              {formState === "editing" && (
                <HiCheck
                  size={20}
                  className="fill-blue-500"
                  onClick={() => handleSubmitChanges(user.id)}
                />
              )}
              {formState === "loading" && <Spinner size={"md"} />}
              <DeleteIcon onClick={triggerModal} className="hover:scale-110" />
            </div>
          </p>
        </td>
      </tr>
      {error && (
        <tr>
          <p className="text-rose-500">{error}</p>
        </tr>
      )}
    </>
  ));
}
