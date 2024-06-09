"use client";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { HiOutlinePlus } from "react-icons/hi";
import { FaTelegram } from "react-icons/fa";
import { IoLogoWhatsapp, IoMdMail } from "react-icons/io";
// TODO: add right links

export default function SpeedDial() {
  return (
    <Menu
      as="button"
      className="fixed bottom-0 right-0 m-8 z-50 py-3 px-4 rounded-full bg-red"
    >
      <MenuButton className="transition-transform data-[open]:rotate-45">
        <HiOutlinePlus color="white" size={30} />
      </MenuButton>
      <Transition
        enter="duration-200 ease-out"
        enterFrom="scale-95 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="duration-300 ease-out"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-95 opacity-0"
      >
        <MenuItems
          anchor="top"
          className="origin-top transition bg-white list-none p-4 pb-8 rounded-xl shadow-lg space-y-4"
        >
          <MenuItem as="li">
            <FaTelegram className="fill-red h-8 w-8 transition-transform hover:scale-105" />
          </MenuItem>
          <MenuItem as="li">
            <IoLogoWhatsapp className="fill-red w-8 h-8 transition-transform hover:scale-105" />
          </MenuItem>
          <MenuItem as="li">
            <IoMdMail className="fill-red w-8 h-8 transition-transform hover:scale-105" />
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
