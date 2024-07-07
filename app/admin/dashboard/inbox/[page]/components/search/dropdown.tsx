"use client"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ReactNode, useEffect, useState } from 'react';
import { HiChevronDown } from "react-icons/hi";

type RenderedItems = {
    value: string | number,
    title: string | ReactNode,
    optionName: string
}

type CustomSelectProps = {
    callback?: (...args: any[]) => any | void,
    initialValue?: string,
    values: RenderedItems[],
}

export default function CustomDropdown({ callback, initialValue, values }: CustomSelectProps) {
    const [current, setCurrent] = useState("")

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setCurrent(e.currentTarget.value)
        callback?.(e.currentTarget.name, e.currentTarget.value)

    }

    useEffect(() => {
        if (initialValue)
            setCurrent(initialValue);
    }, [initialValue])
    return (
        <Menu>
            <MenuButton
                className="dashboard__input max-w-[120px] flex justify-between items-center">
                <p>{current}</p>
                <HiChevronDown className='fill-zinc-400' size={25} />
            </MenuButton>
            <MenuItems
                anchor="bottom"
                className="dashboard__input w-auto p-0 max-h-[200px]"
            >
                {values.map((value) => (
                    <MenuItem key={value.value} >
                        <button value={value.value}
                            onClick={handleClick}
                            name={String(value.optionName)}
                            className="block py-2 px-4 w-full text-left data-[focus]:bg-blue-100">
                            {value.title}
                        </button>
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    )
}