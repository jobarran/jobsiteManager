'use client'

import { updateTaskIncidence } from "@/actions/task/update-task-incidence";
import { Task } from "@/interfaces";
import { useProjectStore } from "@/store";
import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { IoAlertCircle } from "react-icons/io5";
import { FaPercentage } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

export const ProjectTaskIncidenceModal = () => {

    const isIncidenceModalOpen = useProjectStore(state => state.isIncidenceModalOpen)
    const closeIncidenceModal = useProjectStore(state => state.closeIncidenceModal)
    const setProjectTasks = useProjectStore(state => state.setProjectTasks)
    const activeProject = useProjectStore(state => state.activeProject)
    const activeProjectTasks = useProjectStore(state => state.activeProjectTasks)

    const [updatedTasks, setUpdatedTasks] = useState<Task[]>([]);
    const [originalTasks, setOriginalTasks] = useState<Task[]>([]);
    const [isIncidenceSumValid, setIsIncidenceSumValid] = useState<boolean>(true);

    useEffect(() => {
        if (activeProjectTasks)
        setUpdatedTasks(activeProjectTasks)
    }, [activeProjectTasks])

    useEffect(() => {
        setIsIncidenceSumValid(checkTaskIncidenceSum());
    }, [updatedTasks])

    const handleDivideEquivalent = () => {
        if (!Array.isArray(updatedTasks)) {
            throw new Error('Parameter "tasks" must be an array.');
        }
        const numberOfTasks = updatedTasks.length;
        if (numberOfTasks === 0) {
            throw new Error('Array "tasks" must not be empty.');
        }

        const percentage = 100 / numberOfTasks;
        const integerPart = Math.floor(percentage); 
        const remainder = 100 % numberOfTasks; 

        const updatedTasksWithEquivalent = updatedTasks.map((task, index) => ({
            ...task,
            incidence: (integerPart + (index < remainder ? 1 : 0)).toString() 
        }));

        setUpdatedTasks(updatedTasksWithEquivalent);
    };

    const handleUpdateTaskIncidence = () => {
        updateTaskIncidence(updatedTasks, activeProject?.id);
        setProjectTasks(updatedTasks);
        closeIncidenceModal();
    };

    const handleTaskInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
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
        return sum === 100;
    };

    const incidenceSum = () => {
        return updatedTasks.reduce((acc, task) => acc + parseInt(task.incidence), 0);
    }

    const handleCloseIncidenceModal = () => {
        setUpdatedTasks(originalTasks);
        closeIncidenceModal();
    };

    const modalClasses = `fixed inset-0 flex justify-center items-center bg-opacity-50 z-50 transition-opacity duration-300 ${isIncidenceModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;
    const modalContentClasses = `bg-white rounded-lg overflow-hidden h-full md:h-5/6 w-full md:max-w-md xl:max-w-lg transition-opacity duration-300 ${isIncidenceModalOpen ? 'opacity-100' : 'opacity-0'}`;
    const blurEffectClasses = `fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${isIncidenceModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;

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
                    <div className="p-2 md:p-5">
                        <div className="flex items-start justify-between py-4 border-b rounded-t dark:border-gray-600">
                            <div className="flex flex-col">
                                <h1 className="flex items-center text-xl md:text-2xl font-extrabold">
                                    Manage incidences
                                </h1>
                                <p className="text-base font-normal">Incidence sum: <span className="font-bold">{incidenceSum()}%</span></p>
                                {isIncidenceSumValid ? (
                                    <div className="flex items-center text-lime-700">
                                        <FaCheckCircle />
                                        <p className="text-base font-normal pl-2">Nice job! Incidences sum is 100%</p>
                                    </div>
                                ) : (
                                    <div className="flex items-center text-red-600">
                                        <IoAlertCircle />
                                        <p className="text-base font-normal pl-2">Alert! Incidences sum must be 100%</p>
                                    </div>
                                )}

                            </div>
                            <div className="flex">
                                <div className="flex justify-end space-x-1">
                                    <button
                                        type="button"
                                        className="text-sky-700 bg-transparent rounded-lg text-lg w-6 h-6 inline-flex justify-center items-center"
                                        onClick={handleDivideEquivalent}
                                    >
                                        <FaPercentage  />
                                        <span className="sr-only">Equal</span>
                                    </button>
                                    <button
                                        type="button"
                                        className={`bg-transparent rounded-lg text-lg w-6 h-6 inline-flex justify-center items-center ${isIncidenceSumValid ? 'text-sky-700' : 'text-gray-400'}`}
                                        data-modal-toggle="crud-modal"
                                        onClick={handleUpdateTaskIncidence}
                                        disabled={!isIncidenceSumValid}
                                    >
                                        <FaSave />
                                        <span className="sr-only">Save</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="text-red-700 bg-transparent rounded-lg text-lg w-6 h-6 inline-flex justify-center items-center"
                                        data-modal-toggle="crud-modal"
                                        onClick={handleCloseIncidenceModal}
                                    >
                                        <FaX />
                                        <span className="sr-only">Close modal</span>
                                    </button>

                                </div>
                            </div>
                        </div>
                        <div className="overflow-auto max-h-[70vh]">
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
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};