import React from "react";
import MenuIcon from '@mui/icons-material/Menu';

export default function Burger(props: React.ComponentPropsWithoutRef<"button">) {
    return (
        <button {...props} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <MenuIcon sx={{ width: "2rem", height: "2rem" }}/>
        </button>
    )
}