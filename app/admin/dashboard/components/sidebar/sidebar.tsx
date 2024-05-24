"use client";
import { CustomFlowbiteTheme, Sidebar } from "flowbite-react";
import {
  HiMail,
  HiOutlineLogout,
  HiUser,
  HiChevronDoubleRight,
  HiPresentationChartBar,
  HiDatabase,
} from "react-icons/hi";
import { SyntheticEvent, useState } from "react";
import { signOut } from "next-auth/react";

const sidebarTheme: CustomFlowbiteTheme["sidebar"] = {
  root: {
    base: "bg-light rounded-xl m-4",
  },
};

export default function CustomSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggle = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleLogout = async (e: SyntheticEvent) => {
    e.preventDefault();
    await signOut();
  };

  return (
    <>
      <Sidebar
        theme={sidebarTheme}
        collapsed={isCollapsed}
        aria-label="Default sidebar example"
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              as="button"
              onClick={toggle}
              icon={HiChevronDoubleRight}
              data-test={isCollapsed}
            ></Sidebar.Item>
            <Sidebar.Item href="/admin/dashboard" icon={HiPresentationChartBar}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="/admin/dashboard/users" icon={HiUser}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="/admin/dashboard/entities" icon={HiDatabase}>
              Entities
            </Sidebar.Item>
            <Sidebar.Item href="/admin/dashboard/inbox/1" icon={HiMail}>
              Inbox
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              as="button"
              onClick={handleLogout}
              icon={HiOutlineLogout}
            >
              Logout
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
}
