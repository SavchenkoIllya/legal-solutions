"use client";
import {
  HiMail,
  HiOutlineLogout,
  HiUser,
  HiPresentationChartBar,
  HiDatabase,
} from "react-icons/hi";
import { AiFillPicture } from "react-icons/ai";
import { SyntheticEvent } from "react";
import { signOut } from "next-auth/react";
import SidebarElement from "./sidebar-element";

export default function CustomSidebar() {
  const handleLogout = async (e: SyntheticEvent) => {
    e.preventDefault();
    await signOut();
  };

  return (
    <div className="fixed left-0 w-16 min-h-screen select-none border bg-blue-800 shadow">
      <SidebarElement
        link="/admin/dashboard"
        name="Dashboard"
        icon={<HiPresentationChartBar size={24} />}
      />
      <SidebarElement
        link="/admin/dashboard/users"
        name="Users"
        icon={<HiUser size={24} />}
      />
      <SidebarElement
        link="/admin/dashboard/entities"
        name="Entities"
        icon={<HiDatabase size={24} />}
      />
      <SidebarElement
        link="/admin/dashboard/data-storage"
        name="Data Storage"
        icon={<AiFillPicture size={24} />}
      />
      <SidebarElement
        link="/admin/dashboard/inbox/1"
        name="Inbox"
        icon={<HiMail size={24} />}
      />

      {/* divider */}
      <div className="mx-auto my-4 w-5 border-t border-solid border-blue-400"></div>

      <button onClick={handleLogout}>
        <SidebarElement name="Logout" icon={<HiOutlineLogout size={24} />} />
      </button>
    </div>
  );
}
