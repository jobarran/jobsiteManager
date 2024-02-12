import { MdOutlineAdd } from 'react-icons/md';
import { BiMessageRounded } from 'react-icons/bi';
import { FaListUl, FaPercentage } from 'react-icons/fa';
import { IncidenceModalType, ModalType } from '@/interfaces';
import { useProjectStore } from '@/store';

interface Props {
    taskModalOption: 'list' | 'messages',
    setTaskModalOption: (option: 'list' | 'messages') => void,
}

export const ProjectTaskModalOptions = ({ setTaskModalOption, taskModalOption }: Props) => {

    const openSubTaskModal = useProjectStore(state => state.openSubTaskModal)
    const closeSubTaskModal = useProjectStore(state => state.closeSubTaskModal)
    const openIncidenceModal = useProjectStore(state => state.openIncidenceModal)
    const closeIncidenceModal = useProjectStore(state => state.closeIncidenceModal)


    const handleNewSubTask = () => {
        openSubTaskModal(ModalType.New)
    }

    const handleOpenIncidenceModal = () => {
        closeSubTaskModal()
        closeIncidenceModal()
        openIncidenceModal(IncidenceModalType.Subtask)
    };

    return (

        <div className="flex justify-start">

            <button
                className=" inline-flex justify-center items-center p-2 border border-gray-300 text-sm font-medium text-gray-400 rounded-lg hover:bg-gray-100 hover:text-primary-700 mr-2"
                type="button"
                onClick={handleNewSubTask}
            >
                <MdOutlineAdd size={20} />
                New
            </button>

            <button
                className="text-gray-400 bg-transparent p-2 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded-lg inline-flex justify-center items-center mr-2 "
                type="button"
                onClick={handleOpenIncidenceModal}
            >
                <FaPercentage />
                <p className='ml-2'>Incidences</p>
            </button>

            <button
                type="button"
                className="text-gray-400 bg-transparent p-2 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded-lg inline-flex justify-center items-center mr-2 "
                data-modal-toggle="crud-modal"
                onClick={() => setTaskModalOption('list')}
            >
                <FaListUl size={20} />
                <span className="sr-only">Edit modal</span>
            </button>

            <button
                type="button"
                className="text-gray-400 bg-transparent p-2 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded-lg inline-flex justify-center items-center mr-2 "
                data-modal-toggle="crud-modal"
                onClick={() => setTaskModalOption('messages')}
            >
                <BiMessageRounded size={20} />
                <span className="sr-only">Edit modal</span>
            </button>


        </div>
    )

}


