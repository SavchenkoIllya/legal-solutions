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
import { AiFillInstagram } from "react-icons/ai";
import { HiMiniPlusCircle } from "react-icons/hi2";
import { Contacts } from "@/app/api/interfaces/contacts/types";

export default function SpeedDial(props: Partial<Contacts>) {
  return (
    <Menu as="div" className="fixed bottom-0 right-0 m-8 z-50 focus:outline-none focus:border-none focus:ring-0">
      <MenuButton className="transition-transform data-[open]:rotate-45">
        <HiMiniPlusCircle className="fill-red" size={60} />
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
          className="origin-top transition bg-white list-none p-4 rounded-xl shadow-lg flex flex-col gap-4"
        >
          <MenuItem as="a" href={props.telegram} target={"_blank"}>
            <FaTelegram className="dial-icon" />
          </MenuItem>
          <MenuItem as="a" href={props.whatsapp} target={"_blank"}>
            <IoLogoWhatsapp className="dial-icon" />
          </MenuItem>
          <MenuItem as="a" href={props.instagram} target={"_blank"}>
            <AiFillInstagram className="dial-icon" />
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
