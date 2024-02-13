import { StatusBadge } from '../../ui/badges/StatusBadge';
import { MdEdit } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { PriorityBadge } from "@/components";
import { useProjectStore } from "@/store";
import { GoAlert } from 'react-icons/go';
import { FaSave } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

interface Props {
    handleIsEditable: () => void
}

export const ProjectTaskModalHeader = ({ handleIsEditable }: Props) => {

    const closeTaskModal = useProjectStore(state => state.closeTaskModal)

    const activeProjectTasks = useProjectStore(state => state.activeProjectTasks)
    const activeTaskId = useProjectStore(state => state.activeTaskId)

    const taskModalData = activeProjectTasks?.find(task => task.id === activeTaskId)

    return (

        <div className="flex items-start justify-between py-4 border-b rounded-t dark:border-gray-600">
            {
                taskModalData
                    ?
                    <div className="flex flex-col">
                        <h1 className="flex items-center text-xl md:text-2xl font-extrabold">
                            {taskModalData.name}
                            <StatusBadge status={taskModalData.status} />
                            <PriorityBadge priority={taskModalData.priority} />
                        </h1>
                        <p className="text-lg font-semibold text-gray-800 mb-1">{taskModalData?.location}</p>
                        <p className="text-base font-normal text-gray-500">Contractor: {taskModalData?.contractor}</p>
                        <p className="text-base font-normal text-gray-500">End: {taskModalData?.end}</p>
                        <span className="flex items-center">
                            {taskModalData?.incidence === '0' ? (
                                <div className="text-red-600 mr-2">
                                    <GoAlert />
                                </div>
                            ) : null}
                            <p className="flex text-base font-normal text-gray-500">
                                Incidence: {taskModalData?.incidence}%
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
                        className="text-red-700 bg-transparent rounded-lg text-lg w-6 h-6 inline-flex justify-center items-center"
                        data-modal-toggle="crud-modal"
                        onClick={closeTaskModal}
                    >
                        <FaX />
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
            </div>
            
        </div>)
}
