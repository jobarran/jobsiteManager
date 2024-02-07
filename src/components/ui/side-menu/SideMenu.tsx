'use client'

import { BsBuildingFill } from "react-icons/bs";
import { RiPieChart2Fill } from "react-icons/ri";
import { FaHandshakeSimple, FaBuildingUser } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";
import { IoMdSettings } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { useUIStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";





export const SideMenu = () => {

    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen)
    const closeMenu = useUIStore(state => state.closeSideMenu)

    const { data: session } = useSession()

    const isAdmin = (session?.user.role === 'admin')


    return (

        <div>

            {
                isSideMenuOpen && (
                    <div
                        className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
                    />
                )
            }

            {
                isSideMenuOpen && (
                    <div
                        onClick={closeMenu}
                        className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
                    />

                )
            }

            <aside
                id="logo-sidebar"
                className={
                    clsx(
                        "fixed top-15 left-0 z-40 w-64 h-screen pt-2 transition-transform bg-white border-r border-gray-200 lg:translate-x-0",
                        {
                            "-translate-x-full": !isSideMenuOpen,
                            "top-0": isSideMenuOpen
                        }
                    )
                }
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
                    <ul className="space-y-2 font-medium">

                        <Link
                            href="/"
                            className="flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 group"
                            onClick={closeMenu}
                        >
                            <RiPieChart2Fill className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-sky-600 " />
                            <span className="ms-3">Dashboard</span>
                        </Link>
                        <Link
                            href="/project"
                            className="flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 group"
                            onClick={closeMenu}
                        >
                            <BsBuildingFill className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-sky-600 " />
                            <span className="ms-3">Projects</span>
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 group"
                            onClick={closeMenu}    
                        >
                            <HiUsers className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-sky-600 " />
                            <span className="ms-3">Employees</span>
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 group"
                            onClick={closeMenu}    
                        >
                            <FaBuildingUser className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-sky-600 " />
                            <span className="ms-3">Subcontractors</span>
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 group"
                            onClick={closeMenu}    
                        >
                            <FaHandshakeSimple className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-sky-600 " />
                            <span className="ms-3">Clients</span>
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 group"
                            onClick={closeMenu}    
                        >
                            <IoMdSettings className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-sky-600 " />
                            <span className="ms-3">Seetings</span>
                        </Link>


                        {
                            isAdmin && (

                                <>
                                    <div className="w-full h-px bg-gray-200 my-10" />

                                    <Link
                                        href="#" className="flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 group">
                                        <MdAdminPanelSettings className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-sky-600 " />
                                        <span className="ms-3">Admin Panel</span>
                                    </Link>
                                </>

                            )
                        }

                    </ul>
                </div>
            </aside>

        </div>

    )
}
