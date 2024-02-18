'use client'

import { StatusBadge } from '../../ui/badges/StatusBadge';
import { MdEdit } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { PriorityBadge, SavingAlert } from "@/components";
import { useProjectStore } from "@/store";
import { GoAlert } from 'react-icons/go';
import { FaX } from 'react-icons/fa6';
import { FaSave } from 'react-icons/fa';
import { useEffect, useState } from 'react';

interface Props {
    handleSaveSubTaskModal: () => void
}

export const ProjectSubTaskModalHeader = ({ handleSaveSubTaskModal }: Props) => {

    const closeSubTaskModal = useProjectStore(state => state.closeSubTaskModal)
    const activeProjectTasks = useProjectStore(state => state.activeProjectTasks)
    const activeTaskId = useProjectStore(state => state.activeTaskId)
    const activeSubTaskId = useProjectStore(state => state.activeSubTaskId)
    const isSubTaskModalEdited = useProjectStore(state => state.isSubTaskModalEdited)

    const [showAlert, setShowAlert] = useState(false);

    const subTaskModalData = activeProjectTasks?.find(task => task.id === activeTaskId)?.subTasks
        .find(subtask => subtask.id === activeSubTaskId);

    const handleFaXClick = () => {
        if (isSubTaskModalEdited) {
            setShowAlert(true);
        } else {
            closeSubTaskModal();
        }
    };

    const handleAlertConfirm = () => {
        closeSubTaskModal();
        setShowAlert(false);
    };

    const handleAlertCancel = () => {
        setShowAlert(false);
    };

    return (
        <>

            {showAlert && isSubTaskModalEdited && (
                <SavingAlert
                handleAlertConfirm={handleAlertConfirm}
                handleAlertCancel={handleAlertCancel}
                />
            )}

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
                        type="button"
                        className={`bg-transparent rounded-lg text-lg w-6 h-6 inline-flex justify-center items-center ${isSubTaskModalEdited ? 'text-sky-700' : 'text-gray-300'}`}
                        data-modal-toggle="crud-modal"
                        onClick={handleSaveSubTaskModal}
                        disabled={!isSubTaskModalEdited}
                    >
                        <FaSave />
                        <span className="sr-only">Save</span>
                    </button>
                    <button
                        type="button"
                        className="text-red-700 bg-transparent rounded-lg text-lg w-6 h-6 inline-flex justify-center items-center"
                        data-modal-toggle="crud-modal"
                        onClick={handleFaXClick}
                    >
                        <FaX />
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

            </div>
        </>
    )
}