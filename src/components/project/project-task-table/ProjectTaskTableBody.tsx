'use client'

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiFillDownCircle } from "react-icons/ai"
import { BiMessageRounded } from "react-icons/bi";
import { FaListUl } from "react-icons/fa";
import { ModalType } from "@/interfaces";
import { useProjectStore } from "@/store";
import { ProjectTaskModal } from "@/components";
import { handlePriorityBgColor, handlePriorityTextColor } from "@/utils";
import { GoAlert } from "react-icons/go";


interface Props {
    data: any,
    head: string[],
    status: string,
    projectId: string
}

export const ProjectTaskTableBody = ({ data, head, status, projectId }: Props) => {

    const [columnWidths, setColumnWidths] = useState<number[]>([]);
    const tableRef = useRef<HTMLTableElement>(null);

    const openTaskModal = useProjectStore(state => state.openTaskModal)
    const closeSubTaskModal = useProjectStore(state => state.closeSubTaskModal)
    const setActiveTaskId = useProjectStore(state => state.setActiveTaskId)
    const [hideTable, setHideTable] = useState(false)

    useEffect(() => {
        if (tableRef.current) {
            const newColumnWidths = Array(head.length).fill(100); // Set initial width as per your preference
            setColumnWidths(newColumnWidths);
        }
    }, [head]);


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
            return <div className="text-red-600"><GoAlert /></div>
        }
        return <span>{incidence} %</span>;
    };

    // const columnWidths = ['auto', '100px', '100px', '250px', '150px', '100px', '100px', '150px'];

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
                            >
                                <thead className="text-xs text-uppercase hidden sm:table-header-group">
                                    <tr>
                                        {head.map((title: string, index: number) => (
                                            <th
                                                key={index}
                                                scope="col"
                                                className={`pl-2 py-3`}
                                                style={{ minWidth: '100px', width: columnWidths[index] }}
                                            >
                                                {title}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                {filteredData.map((item: any, index: number) => (

                                    <tbody key={index}>
                                        <tr
                                            className="bg-white hover:bg-gray-50"
                                            onClick={() => handleOpenTaskModal(item)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <td className={`${handleStatusColor()} pl-2 py-3 font-medium text-gray-900 whitespace-nowrap border-l-4 border-b-4 border-gray-50`}>
                                                <div className='flex items-center'>
                                                    <div className="lg:flex hidden pr-2 pl-1"></div>
                                                    {item.name}
                                                </div>
                                            </td>
                                            <td className="pl-2 py-3 hidden sm:table-cell font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50">
                                                {item.location}
                                            </td>
                                            <td className="pl-2 py-3 hidden sm:table-cell font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50">
                                                {item.status}
                                            </td>
                                            <td className="pl-2 pr-3 py-3 font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50">
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
                                            <td className="pl-2 py-3 hidden sm:table-cell font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50">
                                                {handleTaskIncidence(item.incidence)}                                            </td>
                                            <td className="pl-2 py-3 hidden sm:table-cell font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50">
                                                {item.contractor}
                                            </td>
                                            <td className="pl-2 py-3 hidden sm:table-cell font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50">
                                                {item.end}
                                            </td>
                                            <td className="pl-2 py-2 font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50">
                                                <span className={`${handlePriorityTextColor(item.priority)} ${handlePriorityBgColor(item.priority)} text-xs font-medium px-2.5 py-0.5 rounded`}>
                                                    {item.priority}
                                                </span>

                                            </td>
                                            <td className="pl-2 py-3 hidden sm:table-cell font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50">
                                                <div className='flex items-center'>

                                                    <Link
                                                        href="#" as={`#`}
                                                        className="sm:flex hidden items-center pr-6 text-gray-400 rounded-lg"
                                                        passHref
                                                    >
                                                        <span className="relative inline-block">
                                                            <span className='transition-all duration-200 hover:text-sky-700'>
                                                                <BiMessageRounded size={20} />
                                                            </span>
                                                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-gray-400 rounded-full">6</span>
                                                        </span>
                                                    </Link>

                                                    <Link
                                                        href="#" as={`#`}
                                                        className="sm:flex hidden items-center pr-6 text-gray-400 rounded-lg"
                                                        passHref
                                                    >
                                                        <span className="relative inline-block">
                                                            <span className='transition-all duration-200 hover:text-sky-700'>
                                                                <FaListUl size={20} />
                                                            </span>
                                                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-gray-400 rounded-full">
                                                                {item.subTasks.length}
                                                            </span>
                                                        </span>
                                                    </Link>
                                                </div>
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
