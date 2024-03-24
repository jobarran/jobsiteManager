'use client';

import { useCompanyStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoPersonOutline } from "react-icons/io5";


interface Props {
    initials: string,
    image?: string,
    id: string,
    logout: () => {}
}

export const Avatar = ({ initials, image, id, logout }: Props) => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const unSetActiveCompany = useCompanyStore((state) => state.unSetActiveCompany)
    const unSetActiveCompanyProjects = useCompanyStore((state) => state.unSetActiveCompanyProjects)
    const unSetActiveCompanyUsers = useCompanyStore((state) => state.unSetActiveCompanyUsers)



    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            // Check if the clicked element is outside the dropdown
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        // Attach the event listener when the component mounts
        document.addEventListener('click', handleOutsideClick);

        // Detach the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);


    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logout(),
        unSetActiveCompany(),
        unSetActiveCompanyProjects(),
        unSetActiveCompanyUsers()
    }

    return (


        <div
            className={`relative`}
            data-te-dropdown-show={isOpen}
            ref={dropdownRef}
        >
            <button
                id="dropdownMenuButton1"
                data-te-dropdown-toggle-ref
                aria-expanded={isOpen}
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={handleButtonClick}
            >
                <span className="sr-only">Open user menu</span>
                <span className="m-2 circle-container inline-flex items-center justify-center h-8 w-8 text-sm font-semibold leading-none rounded-full border border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white">
                    {initials ? (
                        initials
                    ) : (
                        <IoPersonOutline className="person-icon" size={30} />
                    )}
                </span>
            </button>

            <ul
                className={
                    clsx(
                        "fixed z-[1000] mt-3 min-w-max list-none overflow-hidden rounded-lg border-none transition-transform bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-white [&[data-te-dropdown-show]]:block",
                        {
                            "translate-x-full": !isOpen,
                            "right-2": isOpen,
                        }
                    )
                }
                aria-labelledby="dropdownMenuButton1"
                data-te-dropdown-menu-ref

            >
                <Link

                    className="block cursor-pointer w-full whitespace-nowrap px-4 py-2 text-sm font-normal text-sky-600"
                    href="/profile"
                    onClick={handleButtonClick}
                    data-te-dropdown-item-ref
                >
                    Profile
                </Link>
                <Link
                    href="/"
                    className="block cursor-pointer w-full whitespace-nowrap px-4 py-2 text-sm font-normal text-sky-600"
                    onClick={handleLogout}
                    data-te-dropdown-item-ref
                >
                    Log out
                </Link>
            </ul>
        </div>
    )
}
