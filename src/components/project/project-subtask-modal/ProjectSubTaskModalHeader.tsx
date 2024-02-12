import { StatusBadge } from '../../ui/badges/StatusBadge';
import { MdEdit } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { PriorityBadge } from "@/components";
import { useProjectStore } from "@/store";

interface Props {
    handleIsEditable: () => void
}

export const ProjectSubTaskModalHeader = ({ handleIsEditable }: Props) => {

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
                        <p className="text-base font-normal text-gray-500">Incidence: {subTaskModalData?.incidence}%</p>
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
                <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-2xl w-8 h-8 inline-flex justify-center items-center mr-2 dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="crud-modal"
                    onClick={handleIsEditable}
                >
                    <MdEdit />
                    <span className="sr-only">Edit modal</span>
                </button>
                <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-2xl w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="crud-modal"
                    onClick={closeSubTaskModal}
                >
                    <IoClose />
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
        </>
    )
}
