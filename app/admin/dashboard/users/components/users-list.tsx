"use client";
import { User } from "@/app/api/interfaces/users/types";
import { Spinner, TableCell, TableRow } from "flowbite-react";
import EditIcon from "../../components/icons/edit-icon";
import DeleteIcon from "../../components/icons/delete-icon";
import { useState, useRef } from "react";
import { HiCheck } from "react-icons/hi";
import { deleteUser, updateUser } from "@/app/api/interfaces/users/users.api";
import { Modal } from "flowbite-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

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
      <Modal show={deleteModal} onClose={closeModal}>
        <Modal.Header>You are trying to delete user!</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              You cannot cancel this event so be careful deleting users. Once
              you deleted one of them you cannot restore it and have to create
              new user account
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="dashboard__button" onClick={closeModal}>
            Abort
          </button>
          <button
            onClick={() => handleDeleteUser(user.id)}
            className="dashboard__button bg-rose-500 hover:bg-rose-700"
          >
            Confirm delete
          </button>
        </Modal.Footer>
      </Modal>
      <TableRow key={user.id}>
        <TableCell>{user.id}</TableCell>
        <TableCell>
          <p
            ref={editNameRef}
            contentEditable={formState !== "editing" ? false : true}
          >
            {user.name}
          </p>
        </TableCell>
        <TableCell>
          <p
            ref={editEmailRef}
            contentEditable={formState !== "editing" ? false : true}
          >
            {user.email}
          </p>
        </TableCell>
        <TableCell>
          <div className="space-x-4 flex items-center">
            {formState === "untouched" && <EditIcon onClick={handleEdit} />}
            {formState === "editing" && (
              <HiCheck
                size={20}
                className="fill-blue-500"
                onClick={() => handleSubmitChanges(user.id)}
              />
            )}
            {formState === "loading" && <Spinner size={"md"} />}
            <DeleteIcon onClick={triggerModal} />
          </div>
        </TableCell>
      </TableRow>
      {error && (
        <TableRow>
          <p className="text-rose-500">{error}</p>
        </TableRow>
      )}
    </>
  ));
}
