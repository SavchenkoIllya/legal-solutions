"use client";
import { User } from "@/app/api/interfaces/users/types";
import EditIcon from "../../components/icons/edit-icon";
import DeleteIcon from "../../components/icons/delete-icon";
import { useState, useRef } from "react";
import { HiCheck } from "react-icons/hi";
import { deleteUser, updateUser } from "@/app/api/interfaces/users/users.api";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Modal from "../../components/modal/modal";
import { SpinnerDiamond } from "spinners-react";

type DefaultFormStates = "untouched" | "loading" | "editing";

export function UserRow({ user }: { user: User }) {
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
  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id).then(() => {
        signOut();
        router.refresh();
      });
    } catch (error) {
      setError(String(error));
    }
  };

  return (
    <>
      <Modal
        callback={() => handleDeleteUser(user.id)}
        isOpened={deleteModal}
        setToggle={setDeleteModal}
        title="You are trying to delete user!"
        description={`You cannot cancel this event so be careful deleting users. Once
      you deleted one of them you cannot restore it and have to create
      new user account.`}
      />
      <tr key={user.id} className="border-x border-zinc-200">
        <td className="px-5 py-5 text-sm bg-white border-b border-zinc-200">
          <p className="whitespace-no-wrap">{user.id}</p>
        </td>
        <td className="px-5 py-5 text-sm bg-white border-b border-zinc-200">
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
        <td className="px-5 py-5 text-sm bg-white border-b border-zinc-200">
          <p className="whitespace-no-wrap">
            <p
              ref={editEmailRef}
              contentEditable={formState !== "editing" ? false : true}
            >
              {user.email}
            </p>
          </p>
        </td>
        <td className="px-5 py-5 text-sm bg-white border-b border-zinc-200">
          <p className="whitespace-no-wrap">
            <div className="flex items-center space-x-4">
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
              {formState === "loading" && <SpinnerDiamond color="black" />}
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
  );
}
