'use client'

import { getProjectTasksById } from "@/actions";
import { updateTaskIncidence } from "@/actions/task/update-task-incidence";
import { ProjectSubTaskModal, ProjectTaskModalAddNewTask, ProjectTaskModalDetail, ProjectTaskModalDistributionChart, ProjectTaskModalHeader, ProjectTaskModalOptions, ProjectTaskModalSubTaskData, StatusBadge } from "@/components";
import { ModalType, Task } from "@/interfaces";
import { useUIStore } from "@/store";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { IoClose } from 'react-icons/io5';

interface Props {
    tasks: Task[],
    projectId: string
}

export const ProjectTaskIncidenceModal = ({ tasks, projectId }: Props) => {

    const isIncidenceModalOpen = useUIStore(state => state.isIncidenceModalOpen)
    const closeIncidenceModal = useUIStore(state => state.closeIncidenceModal)

    const [updatedTasks, setUpdatedTasks] = useState<Task[]>(tasks);
    const [isIncidenceSumValid, setIsIncidenceSumValid] = useState<boolean>(true);

    useEffect(() => {
        setIsIncidenceSumValid(checkTaskIncidenceSum());
    }, [updatedTasks])



    const handleUpdateTaskIncidence = () => {
        updateTaskIncidence(updatedTasks, projectId);
        closeIncidenceModal();
        window.location.replace(`/project/${projectId}/task`)
    };

    const handleTaskInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        console.log(value);
        setUpdatedTasks(prevTasks => {
            if (index < 0 || index >= prevTasks.length) {
                console.error('Invalid index:', index);
                return prevTasks;
            }
            const newTasks = [...prevTasks];
            newTasks[index] = { ...newTasks[index], incidence: value };
            return newTasks;
        });
    };

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target instanceof HTMLDivElement && event.target.id === 'add-task-modal') {
            closeIncidenceModal();
        }
    };

    const checkTaskIncidenceSum = () => {
        const sum = updatedTasks.reduce((acc, task) => acc + parseInt(task.incidence), 0);
        console.log(sum)
        return sum === 100;
    };

    const modalClasses = `fixed top-0 left-0 flex justify-center items-center w-full h-full bg-opacity-50 z-50 transition-opacity duration-300 ${isIncidenceModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`;

    const modalContentClasses = `bg-white rounded-lg overflow-hidden w-1/3  transition-opacity duration-300 ${isIncidenceModalOpen ? 'opacity-100' : 'opacity-0'
        }`;

    const blurEffectClasses = `fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${isIncidenceModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`;

    return (
        <div>
            <div className={blurEffectClasses}></div>

            <div
                id="add-task-modal"
                tabIndex={-1}
                aria-hidden={!isIncidenceModalOpen}
                className={modalClasses}
                onClick={handleOverlayClick}
            >
                <div className={modalContentClasses}>

                    <div className="flex items-start p-2 md:p-5 justify-between py-4 border-b rounded-t dark:border-gray-600">

                        <div className="flex flex-col">
                            <h1 className="flex items-center text-xl md:text-2xl font-extrabold">
                                Manage incidences
                            </h1>
                            <p className="text-lg font-semibold text-gray-800 mb-1">Text</p>
                            <p className="text-base font-normal text-gray-500">Contractor: Text</p>

                        </div>


                        <div className="flex">

                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-2xl w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="crud-modal"
                                onClick={closeIncidenceModal}
                            >
                                <IoClose />
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                    </div>


                    <div className="p-2 md:p-5 h-full">

                        {updatedTasks.map((task: Task, index: number) => (
                            <div key={index} className={`flex items-center p-2 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                <p className="flex-grow">{task.name}</p>
                                <input
                                    type="text"
                                    name="status"
                                    value={task.incidence}
                                    onChange={(e) => handleTaskInputChange(index, e)}
                                    onInput={(e) => {
                                        const input = e.target as HTMLInputElement;
                                        input.value = Math.max(0, Math.min(100, parseInt(input.value) || 0)).toString();
                                    }}
                                    className="border border-gray-300 rounded-md p-1 ml-2 w-10 h-8" // Adjusted width and height for a smaller input
                                />

                                <p className="ml-2 text-gray-400 flex-shrink-0">/ 100</p>
                            </div>
                        ))}
                        <div className="m-6"></div>

                        {
                            isIncidenceSumValid
                                ?
                                <button
                                    onClick={handleUpdateTaskIncidence}
                                    type="submit"
                                    className="btn-login"
                                >
                                    Update Tasks
                                </button>
                                :
                                <div className="flex w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center text-red-800 bg-red-50" role="alert" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div>
                                        <span className="font-medium">Alert!</span> The sum of all incidences must be 100
                                    </div>
                                </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};