'use client'

import { useProjectStore } from "@/store";
import { truncateString } from "@/utils";
import Link from "next/link";
import { useState } from "react";
import { AiFillDownCircle } from "react-icons/ai"
import { FaList } from "react-icons/fa6";
import { FaChartLine } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";


interface Props {
    data: any,
    head: string[],
    status: string
}

export const ProjectTableBody = ({ data, head, status }: Props) => {

    const setProject = useProjectStore(state => state.setProject)
    const [hideTable, setHideTable] = useState(false)

    const filteredData = data.filter((item: any) => {
        const desiredStatus = status;
        return item.status === desiredStatus;
    });

    const handleHideTable = () => {
        setHideTable(!hideTable)
    }

    const handleStatusTextColor = () => {
        switch (status) {
            case 'ongoing':
                return 'text-sky-700'
            case 'upcoming':
                return 'text-amber-600'
            case 'finished':
                return 'text-lime-600'
            default:
                break;
        }
    }

    const handleStatusColor = () => {
        switch (status) {
            case 'ongoing':
                return 'border-l-sky-700'
            case 'upcoming':
                return 'border-l-amber-600'
            case 'finished':
                return 'border-l-lime-600'
            default:
                break;
        }
    }

    const handleClickRow = (item: any) => {
        setProject({
            id: item.id,
            name: item.code,
            description: item.desciption,
            status: item.status,
        })
        window.location.replace('/project/' + item.id)
    }

    const handleClickShortcut = (item: any) => {
        setProject({
            id: item.id,
            name: item.code,
            description: item.desciption,
            status: item.status,
        })
    }

    const columnWidths = ['auto', '200px', '150px', '250px', '150px', '100px'];


    return (

        <div className="pt-4 pb-4">

            <button
                className={`${handleStatusTextColor()} font-bold rounded inline-flex items-center mt-2`}
                onClick={() => handleHideTable()}
            >
                <AiFillDownCircle className="w-5 h-5 mr-2" />
                <h6 className="text-lg">{`${status.toUpperCase()} Projects`}</h6>
            </button>

            <div className="ml-8">

                {
                    Array.from(filteredData).length === 0
                        ? <div className="italic text-center bg-white p-2 w-full">{`No ${status} projects found`}</div>
                        :
                        <table hidden={hideTable} className="w-full text-sm text-left rtl:text-right text-gray-500">

                            <thead className="text-xs text-uppercase">
                                <tr>
                                    {head.map((title: string, index: number) => (
                                        <th
                                            key={index}
                                            scope="col"
                                            className={`pl-2 py-3`}
                                            style={{ width: columnWidths[index] }}
                                        >
                                            {title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {filteredData.map((item: any, index: number) => (
                                    <tr
                                        key={index}
                                        className="bg-white hover:bg-gray-50"
                                        onClick={(e) => {
                                            // Check if the click target is a link or not
                                            const target = e.target as HTMLElement;
                                            if (target.nodeName !== 'A' && !target.closest('a')) {
                                                handleClickRow(item);
                                            }
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                <td className={`${handleStatusColor()} pl-2 py-3 font-medium text-gray-900 whitespace-nowrap border-l-4 border-b-4 border-gray-50`}>
                                    <span className="hidden xl:inline">{truncateString(item.name, 30)}</span> {/* Show full text for large screens and above */}
                                    <span className="hidden xl:hidden lg:inline">{truncateString(item.name, 15)}</span> {/* Show truncated text for medium screens */}
                                    <span className="lg:hidden">{truncateString(item.name, 8)}</span> {/* Show further truncated text for small screens */}
                                </td>
                                <td className="pl-2 py-3 font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50">
                                    <span className="hidden sm:inline">{item.end}</span>
                                    <span className="sm:hidden">{truncateString(item.end, 4)}</span>
                                </td>
                                <td className="pl-2 py-3 font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50">
                                    {item.workers}
                                </td>
                                <td className="pl-2 py-3 font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50">
                                    <div className="w-full bg-neutral-100 flex items-center">
                                        <div
                                            className="bg-sky-300 pt-1 pb-0.5 text-center text-xs font-bold leading-none text-sky-700"
                                            style={{ width: item.progress }}
                                        >
                                            {item.progress}
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-2 py-3 font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50">
                                    {item.leader}
                                </td>
                                <td className="pl-2 py-3 font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50">
                                    <div className='flex items-center'>
                                        <Link
                                            href="/project/[id]" as={`/project/${item.id}`}
                                            className="sm:flex hidden items-center pr-2 text-gray-400 rounded-lg"
                                            passHref
                                        >
                                            <FaChartLine />
                                        </Link>
                                        <Link
                                            href="/project/[id]/task" as={`/project/${item.id}/task`}
                                            className="flex items-center pr-2 text-gray-400 rounded-lg"
                                            onClick={() => handleClickShortcut(item)}
                                            passHref
                                        >
                                            <FaList />
                                        </Link>
                                        <Link
                                            href="/project/[id]/personal" as={`/project/${item.id}/personal`}
                                            className="md:flex hidden items-center pr-2 text-gray-400 rounded-lg"
                                            passHref
                                        >
                                            <FaUserGroup />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                                ))}
                        </tbody>

                        </table>
                }
        </div>
        </div >
    )
}
