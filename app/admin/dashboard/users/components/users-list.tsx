"use client";
import { User } from "@/app/api/interfaces/users/types";
import { UserRow } from "./user-row";

export function UserList({ users }: { users: User[] }) {
  if (!users.length) return <p>No users at this moment</p>;

  return (
    <>
      {users.map((user: User) => (
        <UserRow key={user.id} user={user} />
      ))}
    </>
  );
}
