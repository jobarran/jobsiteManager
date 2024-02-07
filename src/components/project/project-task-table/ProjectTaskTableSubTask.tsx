import { Task } from "@/interfaces"
import Link from "next/link"
import { IoOpenOutline } from 'react-icons/io5';
import { BiMessageRounded } from "react-icons/bi";


interface Props {
    item: any,
    index: number,
    subTasksVisibility: any,
    handleOpenModal: (name: string, id: string) => void,
    handleStatusSubColor: any
}

export const ProjectTaskTableSubTask = ({ item, index, subTasksVisibility, handleOpenModal, handleStatusSubColor }: Props) => {


    return (

        <>

            {item.subTask.map((subTask: any, subIndex: number) => (

                <tr
                    hidden={!subTasksVisibility[index]}
                    key={subIndex}
                    className={`bg-white hover:bg-gray-50`}
                    >

                    <td className={`${handleStatusSubColor()} pl-2 py-3 font-medium text-gray-400 whitespace-nowrap border-l-4 border-b-4 border-gray-50`}>
                        <div className='flex items-center'>
                            {item.location}
                        </div>
                    </td>
                    <td className="pl-2 py-3 font-medium text-gray-400 whitespace-nowrap border-b-4 border-gray-50">
                        {subTask.name}
                    </td>
                    <td className="pl-2 py-3 font-medium text-gray-400 whitespace-nowrap border-b-4 border-gray-50">
                        {subTask.status}
                    </td>
                    <td className="pl-2 pr-3 py-3 font-medium text-gray-400 whitespace-nowrap border-b-4 border-gray-50">
                        <div className="w-full bg-neutral-100 flex items-center">
                            <div
                                className="bg-sky-100 pt-1 pb-0.5 text-center text-xs font-bold leading-none text-sky-500"
                                style={{ width: item.progress }}
                            >
                                {item.progress}
                            </div>
                        </div>
                    </td>
                    <td className="pl-2 py-3 font-medium text-gray-400 whitespace-nowrap border-b-4 border-gray-50">
                        {item.incidence} %
                    </td>
                    <td className="pl-2 py-3 font-medium text-gray-400 whitespace-nowrap border-b-4 border-gray-50">
                        {item.contractor}
                    </td>
                    <td className="pl-2 py-3 font-medium text-gray-400 whitespace-nowrap border-b-4 border-gray-50">
                        {item.end}
                    </td>
                    <td className="pl-2 py-3 font-medium text-gray-400 whitespace-nowrap border-b-4 border-gray-50">
                        {item.priority}
                    </td>
                    <td className="pl-2 py-3 font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50">
                        <div className='flex items-center'>
                            <Link
                                href="#" as={`#`}
                                className="sm:flex hidden items-center pr-2 text-gray-400 rounded-lg"
                                passHref
                            >
                                <span className='transition-all duration-200 hover:text-sky-700'>
                                    <IoOpenOutline size={20} />
                                </span>
                            </Link>
                            <Link
                                href="#" as={`#`}
                                className="sm:flex hidden items-center pr-2 text-gray-400 rounded-lg"
                                passHref
                            >
                                <span className='transition-all duration-200 hover:text-sky-700'>
                                    <BiMessageRounded size={20} />
                                </span>
                            </Link>
                        </div>
                    </td>
                </tr>
            ))}



            <tr
                hidden={!subTasksVisibility[index]}

            >
                <td className="pl-2 py-3 font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50">
                    <button
                        className=" flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 md:w-auto hover:bg-gray-100 hover:text-primary-700s"
                        type="button"
                        onClick={() => handleOpenModal(item.name, item.id)}
                    >
                        <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                        Add
                    </button>
                </td>
            </tr>

        </>

    )
}






