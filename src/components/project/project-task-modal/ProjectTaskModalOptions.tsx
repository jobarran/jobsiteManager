import { MdOutlineAdd } from 'react-icons/md';
import { FaPercentage } from 'react-icons/fa';
import { IncidenceModalType, ModalType } from '@/interfaces';
import { useProjectStore } from '@/store';
import { FaChartBar } from "react-icons/fa";

export const ProjectTaskModalOptions = () => {

    const openSubTaskModal = useProjectStore(state => state.openSubTaskModal)
    const closeSubTaskModal = useProjectStore(state => state.closeSubTaskModal)
    const openIncidenceModal = useProjectStore(state => state.openIncidenceModal)
    const closeIncidenceModal = useProjectStore(state => state.closeIncidenceModal)


    const handleNewSubTask = () => {
        openSubTaskModal(ModalType.New)
    }

    const handleOpenIncidenceModal = (type: string) => {
        closeSubTaskModal()
        closeIncidenceModal()
        if (type === 'subtask') {
            openIncidenceModal(IncidenceModalType.Subtask)
        } else
        openIncidenceModal(IncidenceModalType.Progress)
    };

    return (

        <div className="flex justify-start">

            <button
                className=" inline-flex justify-center items-center p-2 border border-gray-300 text-sm font-medium text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 mr-2"
                type="button"
                onClick={handleNewSubTask}
            >
                <MdOutlineAdd size={20} />
                New
            </button>

            <button
                className="text-gray-400 bg-transparent p-2 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded-lg inline-flex justify-center items-center mr-2 "
                type="button"
                onClick={()=>handleOpenIncidenceModal('subtask')}
            >
                <FaPercentage />
                <p className='ml-2'>Incidences</p>
            </button>

            <button
                className="text-gray-400 bg-transparent p-2 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded-lg inline-flex justify-center items-center mr-2 "
                type="button"
                onClick={()=>handleOpenIncidenceModal('progress')}
            >
                <FaChartBar />
                <p className='ml-2'>Progress</p>
            </button>




        </div>
    )

}


