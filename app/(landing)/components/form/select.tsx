import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { HiChevronDown } from "react-icons/hi";
import { Regions } from "@/app/api/constants/Regions";

type CustomSelectProps = {
    callback?: (...args: any[]) => any | void
}

export default function CustomSelect({ callback }: CustomSelectProps) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        callback?.(e.currentTarget.value)
    }

    return (
        <Menu>
            <MenuButton
                className="input text-left bg-white flex justify-between items-center">
                <p>Region</p>
                <HiChevronDown className='fill-zinc-400' size={25} />
            </MenuButton>
            <MenuItems
                anchor="bottom"
                className="input p-0 bg-white max-h-[200px]">
                {Regions.map((region) => (
                    <MenuItem key={region}>
                        <button value={region}
                            onClick={handleClick}
                            className="block p-2 w-full text-left data-[focus]:bg-blue-100">
                            {region}
                        </button>
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    )
}