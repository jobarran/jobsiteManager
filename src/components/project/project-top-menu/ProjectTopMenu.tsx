'use client';

import Link from 'next/link';
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";


import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Project } from '@/interfaces';
import { lastPath } from '@/utils';
import { usePathname } from 'next/navigation'


export const ProjectTopMenu = (project: Project) => {

    const pathname = usePathname()

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const handleActiveItem = (item: string) => item === lastPath(pathname);

    const handleMenuToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuOpen(true);
    };

    useEffect(() => {
        const closeDropdown = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };

        document.body.addEventListener('click', closeDropdown);

        return () => document.body.removeEventListener('click', closeDropdown);
    }, []);

    return (
        <nav className='flex flex-row lg:flex-row px-2 mb-3 h-12 justify-between w-full border border-gray-100 bg-white'>
            <div className='flex items-center'>
                <div className="flex items-center justify-start rtl:justify-end">
                    {(true) && (
                        <span className={`pl-2 text-lg antialiased text-grey-700 `}>{project.name}</span>
                    )}
                </div>
            </div>
            <div className='lg:flex hidden items-center'>
                <Link
                    href="/project/[id]" as={`/project/${project.id}`}
                    className="flex items-center p-2 text-gray-500 rounded-lg group"
                    onClick={() => { }}
                >
                    <span className={
                        clsx(
                            'transition-all duration-200 hover:text-gray-800',
                            {
                                "text-gray-800": handleActiveItem(''),
                            }
                        )
                    }>Dashboard</span>
                </Link>
                <PiDotsThreeVerticalBold />
                <Link
                    href="/project/[id]/task" as={`/project/${project.id}/task`}
                    className="flex items-center p-2 text-gray-500 rounded-lg group"
                    onClick={() => { }}
                >
                    <span className={
                        clsx(
                            'transition-all duration-200 hover:text-gray-800',
                            {
                                "text-gray-800": handleActiveItem('task'),
                            }
                        )
                    }>Tasks</span>
                </Link>
                <PiDotsThreeVerticalBold />
                <Link
                    href="/project/[id]/doc" as={`/project/${project.id}/doc`}
                    className="flex items-center p-2 text-gray-400 rounded-lg group"
                    onClick={() => { }}
                >
                    <span className={
                        clsx(
                            'transition-all duration-200 hover:text-gray-800',
                            {
                                "text-gray-800": handleActiveItem('doc'),
                            }
                        )
                    }>Docs</span>
                </Link>
                <PiDotsThreeVerticalBold />
                <Link
                    href="/project/[id]/personal" as={`/project/${project.id}/personal`}
                    className="flex items-center p-2 text-gray-400 rounded-lg group"
                    onClick={() => { }}
                >
                    <span className={
                        clsx(
                            'transition-all duration-200 hover:text-gray-800',
                            {
                                "text-gray-800": handleActiveItem('personal'),
                            }
                        )
                    }>Personal</span>
                </Link>
                <PiDotsThreeVerticalBold />
                <Link
                    href="/project/[id]/report" as={`/project/${project.id}/report`}
                    className="flex items-center p-2 text-gray-400 rounded-lg group"
                    onClick={() => { }}
                >
                    <span className={
                        clsx(
                            'transition-all duration-200 hover:text-gray-800',
                            {
                                "text-gray-800": handleActiveItem('report'),
                            }
                        )
                    }>Reports</span>
                </Link>
            </div>
            {/* Mobile Menu Toggle Button */}
            <div className='lg:hidden'>
                <button
                    onClick={(event) => handleMenuToggle(event)}
                    className="p-2 text-gray-400 rounded-lg hover:bg-gray-100 group"
                >
                    <PiDotsThreeOutlineVerticalFill className='h-8 w-5' />
                </button>
                {/* Mobile Dropdown Menu */}
                {!!menuOpen && (
                    <div ref={menuRef}>

                        <ul
                            className={
                                clsx(
                                    "fixed z-[1000] right-4 mt-3 w-32 list-none overflow-hidden transition-transform  border border-gray-100 bg-white",
                                    {
                                        "lg:hidden": !menuOpen,
                                    }
                                )
                            }
                            aria-labelledby="dropdownMenuButton1"
                            data-te-dropdown-menu-ref

                        >
                            <Link
                                href={`/project/${project.id}`}
                                className={
                                    clsx(
                                        "block cursor-pointer w-full whitespace-nowrap px-4 py-2 text-sm text-gray-400 hover:bg-gray-100",
                                        {
                                            "text-gray-800": handleActiveItem(''),
                                        }
                                    )
                                }
                                onClick={() => setMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                            <Link
                                href={`/project/${project.id}/task`}
                                className={
                                    clsx(
                                        "block cursor-pointer w-full whitespace-nowrap px-4 py-2 text-sm text-gray-400 hover:bg-gray-100",
                                        {
                                            "text-gray-800": handleActiveItem('task'),
                                        }
                                    )
                                }
                                onClick={() => setMenuOpen(false)}
                            >
                                Tasks
                            </Link>
                            <Link
                                href={`/project/${project.id}/doc`}
                                className={
                                    clsx(
                                        "block cursor-pointer w-full whitespace-nowrap px-4 py-2 text-sm text-gray-400 hover:bg-gray-100",
                                        {
                                            "text-gray-800": handleActiveItem('doc'),
                                        }
                                    )
                                }
                                onClick={() => setMenuOpen(false)}
                            >
                                Docs
                            </Link>
                            <Link
                                href={`/project/${project.id}/personal`}
                                className={
                                    clsx(
                                        "block cursor-pointer w-full whitespace-nowrap px-4 py-2 text-sm text-gray-400 hover:bg-gray-100",
                                        {
                                            "text-gray-800": handleActiveItem('personal'),
                                        }
                                    )
                                }
                                onClick={() => setMenuOpen(false)}
                            >
                                Personal
                            </Link>
                            <Link
                                href={`/project/${project.id}/report`}
                                className={
                                    clsx(
                                        "block cursor-pointer w-full whitespace-nowrap px-4 py-2 text-sm text-gray-400 hover:bg-gray-100",
                                        {
                                            "text-gray-800": handleActiveItem('report'),
                                        }
                                    )
                                }
                                onClick={() => setMenuOpen(false)}
                            >
                                Reports
                            </Link>
                        </ul>

                    </div>
                )}
            </div>
        </nav>
    );
};