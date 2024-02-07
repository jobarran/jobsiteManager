import { MdEdit, MdOutlineAdd } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { BiMessageRounded } from 'react-icons/bi';
import { FaListUl } from 'react-icons/fa';
import { list } from 'postcss';
import { ModalType, SubTask } from '@/interfaces';
import { useUIStore } from '@/store';

interface Props {
    taskModalOption: 'list' | 'messages',
    setTaskModalOption: (option: 'list' | 'messages') => void,
}

export const ProjectTaskModalOptions = ({ setTaskModalOption, taskModalOption }: Props) => {

    const openSubTaskModal = useUIStore(state => state.openSubTaskModal)
    const closeSubTaskModal = useUIStore(state => state.closeSubTaskModal)
    
    const handleNewSubTask = () => {
        openSubTaskModal(null, ModalType.New)
    }

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


