'use client'

import { StatusBadge } from '../../ui/badges/StatusBadge';
import { MdEdit } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { PriorityBadge } from "@/components";
import { useProjectStore } from "@/store";
import { GoAlert } from 'react-icons/go';
import { FaX } from 'react-icons/fa6';
import { FaSave } from 'react-icons/fa';
import { useEffect } from 'react';

interface Props {
    handleIsEditable: () => void,
    progressChange: boolean
    setProgressChange: (arg0: boolean) => void
}

export const ProjectSubTaskModalHeader = ({ handleIsEditable, progressChange, setProgressChange }: Props) => {

    const closeSubTaskModal = useProjectStore(state => state.closeSubTaskModal)
    const activeProjectTasks = useProjectStore(state => state.activeProjectTasks)
    const activeTaskId = useProjectStore(state => state.activeTaskId)
    const activeSubTaskId = useProjectStore(state => state.activeSubTaskId)  


    const subTaskModalData = activeProjectTasks?.find(task => task.id === activeTaskId)?.subTasks
        .find(subtask => subtask.id === activeSubTaskId);

    return (
        <>
            {
                subTaskModalData
                    ?
                    <div className="flex flex-col">
                        <h1 className="flex items-center text-xl md:text-2xl font-extrabold">
                            {subTaskModalData.name}
                            <StatusBadge status={subTaskModalData.status} />
                            <PriorityBadge priority={subTaskModalData.priority} />
                        </h1>
                        <p className="text-lg font-semibold text-gray-800 mb-1">{subTaskModalData?.location}</p>
                        <p className="text-base font-normal text-gray-500">Contractor: {subTaskModalData?.contractor}</p>
                        <p className="text-base font-normal text-gray-500">End: {subTaskModalData?.end}</p>
                        <span className="flex items-center">
                            {subTaskModalData?.incidence === '0' ? (
                                <div className="text-red-600 mr-2">
                                    <GoAlert />
                                </div>
                            ) : null}
                            <p className="flex text-base font-normal text-gray-500">
                                Incidence: {subTaskModalData?.incidence}%
                            </p>

                        </span>
                    </div>
                    :
                    <div className="flex flex-col animate-pulse ">
                        <div className="h-6 w-64 mb-2 bg-slate-200 rounded"></div>
                        <div className="h-4 w-44 mt-1 mb-3 bg-slate-200 rounded"></div>
                        <div className="h-3 w-32 my-1 bg-slate-200 rounded"></div>
                        <div className="h-3 w-32 my-1 bg-slate-200 rounded"></div>
                        <div className="h-3 w-32 my-1 bg-slate-200 rounded"></div>
                    </div>
            }

            <div className="flex">
                <div className="flex justify-end space-x-1">
                    <button
                        type="submit"
                        className={`bg-transparent rounded-lg text-lg w-6 h-6 inline-flex justify-center items-center text-sky-700`}
                        onClick={handleIsEditable}
                    >
                        <MdEdit />
                        <span className="sr-only">Save</span>
                    </button>
                    <button
                        type="button"
                        className={`bg-transparent rounded-lg text-lg w-6 h-6 inline-flex justify-center items-center ${!progressChange ? 'text-sky-700' : 'text-gray-400'}`}
                        data-modal-toggle="crud-modal"
                        onClick={() => { }}
                        disabled={!progressChange}
                    >
                        <FaSave />
                        <span className="sr-only">Save</span>
                    </button>
                    <button
                        type="button"
                        className="text-red-700 bg-transparent rounded-lg text-lg w-6 h-6 inline-flex justify-center items-center"
                        data-modal-toggle="crud-modal"
                        onClick={closeSubTaskModal}
                    >
                        <FaX />
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

            </div>
        </>
    )
}