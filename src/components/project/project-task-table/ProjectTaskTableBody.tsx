'use client'

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiFillDownCircle } from "react-icons/ai"
import { BiMessageRounded } from "react-icons/bi";
import { FaListUl } from "react-icons/fa";
import { ModalType } from "@/interfaces";
import { useProjectStore } from "@/store";
import { ProjectTaskModal } from "@/components";
import { handlePriorityBgColor, handlePriorityTextColor, truncateString } from "@/utils";
import { GoAlert } from "react-icons/go";


interface Props {
    data: any,
    head: string[],
    status: string,
}

export const ProjectTaskTableBody = ({ data, head, status }: Props) => {

    const [columnWidths, setColumnWidths] = useState<number[]>([]);
    const tableRef = useRef<HTMLTableElement>(null);

    const openTaskModal = useProjectStore(state => state.openTaskModal)
    const closeSubTaskModal = useProjectStore(state => state.closeSubTaskModal)
    const setActiveTaskId = useProjectStore(state => state.setActiveTaskId)
    const isSubTaskModalOpen = useProjectStore(state => state.isSubTaskModalOpen)

    const [hideTable, setHideTable] = useState(false)

    useEffect(() => {
        adjustColumnWidth();
    }, [data]);

    const adjustColumnWidth = () => {
        const longestText = data.reduce((maxLength: number, item: any) => {
            return Math.max(maxLength, item.name.length);
        }, 0);
        if (tableRef.current) {
            const firstColumnWidth = Math.min(400, longestText * 10);
            tableRef.current.style.setProperty('--first-column-width', `${firstColumnWidth}px`);
        }
    };


    const filteredData = data.filter((item: any) => {
        const desiredStatus = status;
        return item.status === desiredStatus;
    }).sort((a: any, b: any) => b.progress - a.progress);

    const handleHideTable = () => {
        setHideTable(!hideTable)
    }

    const handleOpenTaskModal = (task: any) => {
        closeSubTaskModal()
        setActiveTaskId(task.id)
        openTaskModal(ModalType.Edit)
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

    const handleTaskIncidence = (incidence: string) => {
        if (incidence === '0') {


            return <div className="text-red-60 text-center items-center">
                        <div className='flex justify-center'>
                            <GoAlert />
                        </div>
                    </div>

        }
        return <span>{incidence} %</span>;
    };

    return (

        <div>

            <div className="pt-4 pb-4">

                <ProjectTaskModal />

                <button
                    className={`${handleStatusTextColor()} font-bold rounded inline-flex items-center mt-2`}
                    onClick={() => handleHideTable()}
                >
                    <AiFillDownCircle className="w-5 h-5 mr-2" />
                    <h6 className="text-lg">{`${status.toUpperCase()} Tasks`}</h6>
                </button>

                <div className="ml-2">

                    {
                        Array.from(filteredData).length === 0
                            ? <div hidden={hideTable} className="italic text-center bg-white p-2 w-full">{`No ${status} tasks found`}</div>
                            :
                            <table
                                hidden={hideTable}
                                className="w-full text-sm text-left rtl:text-right text-gray-500"
                                ref={tableRef}
                            >
                                <thead className="text-xs text-uppercase hidden sm:table-header-group">
                                    <tr>
                                        {head.map((title: string, index: number) => (
                                            <th
                                                key={index}
                                                scope="col"
                                                className={`pl-2 py-3`}
                                                style={{
                                                    minWidth: '50px',
                                                    width: index === 0 ? 'var(--first-column-width)' : 'auto',
                                                    textAlign: index === 0 ? 'left' : 'center',
                                                }}
                                            >
                                                {title}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                {filteredData.map((item: any, index: number) => (

                                    <tbody key={index}>
                                        <tr
                                            className={`bg-white hover:bg-gray-50 ${isSubTaskModalOpen ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            onClick={isSubTaskModalOpen ? undefined : () => handleOpenTaskModal(item)}
                                            style={{ cursor: isSubTaskModalOpen ? 'auto' : 'pointer' }}
                                        >
                                            <td className={`${handleStatusColor()} pl-2 py-3 font-medium text-gray-900 whitespace-nowrap border-l-4 border-b-4 border-gray-50`}>
                                                <span className="hidden lg:inline">{truncateString(item.name, 40)}</span> {/* Show full text for large screens and above */}
                                                <span className="hidden lg:hidden md:inline">{truncateString(item.name, 25)}</span> {/* Show truncated text for medium screens */}
                                                <span className="md:hidden">{truncateString(item.name, 15)}</span> {/* Show further truncated text for small screens */}
                                            </td>
                                            <td className="pl-2 py-3 hidden sm:table-cell font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50 text-center">
                                                <span className="hidden md:inline">{truncateString(item.location, 10)}</span> {/* Show full text for large screens and above */}
                                                <span className="hidden md:hidden sm:inline">{truncateString(item.location, 10)}</span> {/* Show truncated text for medium screens */}
                                                <span className="sm:hidden">{truncateString(item.location, 10)}</span> {/* Show further truncated text for small screens */}
                                            </td>
                                            <td className="pl-2 pr-3 py-3 font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50 text-center">
                                                <div
                                                    className="w-full bg-neutral-100 flex items-center"
                                                    style={{ minWidth: '75px' }}
                                                >
                                                    <div
                                                        className="bg-sky-300 pt-1 pb-0.5 text-center text-xs font-bold leading-none text-sky-700"
                                                        style={{ width: `${item.progress}%` }}
                                                    >
                                                        {item.progress.toFixed(0)}%
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="pl-2 py-3 hidden sm:table-cell font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50 text-center">
                                                {handleTaskIncidence(item.incidence)}
                                            </td>
                                            <td className="pl-2 py-3 hidden sm:table-cell font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50 text-center">
                                                {item.contractor}
                                            </td>
                                            <td className="pl-2 py-3 hidden sm:table-cell font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50 text-center">
                                                {item.end}
                                            </td>
                                            <td className="pl-2 py-2 font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50 text-center">
                                                <span className={`${handlePriorityTextColor(item.priority)} ${handlePriorityBgColor(item.priority)} text-xs font-medium px-2.5 py-0.5 rounded`}>
                                                    {item.priority}
                                                </span>

                                            </td>
                                        </tr>

                                    </tbody>

                                ))}

                            </table>
                    }
                </div>
            </div>
        </div>
    )
}
