import { ModalType, SubTask, SubTaskStatus } from "@/interfaces";
import { useUIStore } from "@/store"
import { handlePriorityBgColor, handlePriorityTextColor, handleStatusBorderColor, parseNumberFromString } from "@/utils";


export const ProjectTaskModalSubTaskTable = () => {

    const taskModalData = useUIStore(state => state.taskModalData)
    const openSubTaskModal = useUIStore(state => state.openSubTaskModal)


    const sortByStatus = (a: SubTask, b: SubTask): number => {
        const statusOrder: Record<SubTaskStatus, number> = { ongoing: 1, upcoming: 2, finished: 3, '': 4 };
        return statusOrder[a.status] - statusOrder[b.status];
    };

    const sortedSubTask = taskModalData?.subTasks.slice().sort(sortByStatus);


    const head = ['Name', 'Progress', 'End', 'Priority']
    const columnWidths = ['auto', '100px', '100px', '100px', '100px'];

    const handleOpenSubTaskModal = (subTask:SubTask) => {
        openSubTaskModal(subTask, ModalType.Edit)
    }

    return (


        <table className="w-full text-sm text-left rtl:text-right text-gray-500">

            <thead className="text-xs text-uppercase">
                <tr>
                    {head.map((title: string, index: number) => (
                        <th
                            key={index}
                            scope="col"
                            className={`pl-2 py-3`}
                            style={{ width: columnWidths[index] }}
                        >
                            {title}
                        </th>
                    ))}
                </tr>
            </thead>

            {
                sortedSubTask?.map((item: any, index: number) => (

                    <tbody key={index}>
                        <tr
                            className="bg-white hover:bg-gray-50"
                            onClick={() => handleOpenSubTaskModal(item)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td className={`${handleStatusBorderColor(item.status)} pl-2 py-2 font-medium text-gray-900 whitespace-nowrap border-l-4 border-b-4 border-gray-50`}>
                                <div className='flex items-center'>
                                    <div className="lg:flex hidden pr-2 pl-1"></div>
                                    {item.name}
                                </div>
                            </td>
                            <td className="pl-2 pr-3 py-3 font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50">
                                <div className="w-full bg-neutral-100 flex items-center">
                                    <div
                                        className="bg-sky-300 pt-1 pb-0.5 text-center text-xs font-bold leading-none text-sky-700"
                                        style={{ width: `${parseNumberFromString(item.progress)}%` }}
                                    >
                                    </div>
                                </div>
                            </td>
                            <td className="pl-2 py-2 font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50">
                                {item.end}
                            </td>
                            <td className="pl-2 py-2 font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50">
                                <span className={`${handlePriorityTextColor(item.priority)} ${handlePriorityBgColor(item.priority)} text-xs font-medium px-2.5 py-0.5 rounded`}>
                                    {item.priority}
                                </span>

                            </td>

                        </tr>

                    </tbody>

                ))

            }

        </table>
    )
}
