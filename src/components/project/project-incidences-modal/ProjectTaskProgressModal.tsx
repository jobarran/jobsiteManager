'use client'

import { updateTaskIncidence } from "@/actions/task/update-task-incidence";
import { Task } from "@/interfaces";
import { useProjectStore } from "@/store";
import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { getProgressBySubTaskIncidence } from "@/utils";
import { updateTaskProgress } from "@/actions";

export const ProjectTaskProgressModal = () => {

    const isIncidenceModalOpen = useProjectStore(state => state.isIncidenceModalOpen)
    const closeIncidenceModal = useProjectStore(state => state.closeIncidenceModal)
    const setProjectTasks = useProjectStore(state => state.setProjectTasks)
    const activeProject = useProjectStore(state => state.activeProject)
    const activeProjectTasks = useProjectStore(state => state.activeProjectTasks)
    const activeTaskId = useProjectStore(state => state.activeTaskId)
    const taskModalData = activeProjectTasks?.find(task => task.id === activeTaskId)

    const TaskModalData = activeProjectTasks?.find(task => task.id === activeTaskId)
    const progressBySubTaskIncidence = getProgressBySubTaskIncidence(taskModalData?.subTasks)


    const [taskProgress, setTaskProgress] = useState(parseInt(TaskModalData?.progress ? TaskModalData?.progress : '0'))
    const [updatedTask, setUpdatedTask] = useState<Task>();
    const [isModalEditable, setIsModalEditable] = useState(false)
    const [isCheckedSubtask, setIsCheckedSubtask] = useState(taskProgress === 0);
    const [isCheckedManual, setIsCheckedManual] = useState(taskProgress > 0);

    useEffect(() => {
        if (TaskModalData)
            setUpdatedTask(TaskModalData)
    }, [activeProjectTasks])


    const handleUpdateTaskProgress = () => {
        if (activeProjectTasks) {
            const updatedProgress = isCheckedSubtask ? '0' : taskProgress.toString();
            const updatedProgressStore = isCheckedSubtask ? 0 : taskProgress;
            updateTaskProgress(updatedProgress, activeTaskId, activeProject?.id)
            const updatedTasks = updateTaskProgressById(activeProjectTasks, activeTaskId, updatedProgressStore);
            setProjectTasks(updatedTasks);
            closeIncidenceModal();
        } else {
            console.error('Active project tasks is null.');
        }
    };

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target instanceof HTMLDivElement && event.target.id === 'add-task-modal') {
            closeIncidenceModal();
        }
    };

    const updateTaskProgressById = (tasks: Task[], activeTaskId: string | undefined, taskProgress: number): Task[] => {

        const index = tasks.findIndex(task => task.id === activeTaskId);

        if (index !== -1) {
            const updatedTasks = [...tasks];
            updatedTasks[index] = {
                ...updatedTasks[index],
                progress: taskProgress.toString() 
            };
            return updatedTasks;
        }

        return tasks;
    };

    const handleCloseIncidenceModal = () => {
        // setUpdatedTasks(originalTasks);
        closeIncidenceModal();
    };

    const handleOnProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsModalEditable(true)
        setTaskProgress(parseInt(event.target.value))
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        console.log(name, checked)
        if (name === 'subtask' && checked) {
            setIsModalEditable(true)
            setTaskProgress(progressBySubTaskIncidence)
            setIsCheckedSubtask(true);
            setIsCheckedManual(false);
        } else if (name === 'manual' && checked) {
            setIsModalEditable(true)
            setIsCheckedManual(true);
            setIsCheckedSubtask(false);
        }
    };

    const labelMargin = taskProgress <= 4 ? '2px' : taskProgress >= 96 ? 'calc(100% - 1.3rem - 1.25rem)' : `calc(${taskProgress}% - 1.25rem)`;
    const labelStyle = {
        marginLeft: labelMargin,
        marginRight: labelMargin
    };

    const modalClasses = `fixed inset-0 flex justify-center items-center bg-opacity-50 z-50 transition-opacity duration-300 ${isIncidenceModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;

    const modalContentClasses = `bg-white rounded-lg overflow-hidden w-full md:max-w-md xl:max-w-lg transition-opacity duration-300 ${isIncidenceModalOpen ? 'opacity-100' : 'opacity-0'}`;
    const blurEffectClasses = `fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${isIncidenceModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;

    return (
        <div>
            <div className={blurEffectClasses}></div>

            <div
                id="incidence-modal"
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
                                    Manage Progress
                                </h1>

                            </div>
                            <div className="flex">
                                <div className="flex justify-end space-x-1">
                                    <button
                                        type="button"
                                        className={`bg-transparent rounded-lg text-lg w-6 h-6 inline-flex justify-center items-center ${isModalEditable ? 'text-sky-700' : 'text-gray-400'}`}
                                        data-modal-toggle="crud-modal"
                                        onClick={handleUpdateTaskProgress}
                                        disabled={false}
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

                        <div className="mt-4">
                            <h3 className="text-md font-semibold text-gray-800">
                                How would you prefer to manage the progress of this task?
                            </h3>
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    id="subtask"
                                    name="subtask"
                                    value="subtask"
                                    className="mr-2"
                                    checked={isCheckedSubtask}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="subtask" className="text-sm font-normal text-gray-800">
                                    By tracking individual subtask progress
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    id="manual"
                                    name="manual"
                                    value="manual"
                                    className="mr-2"
                                    checked={isCheckedManual}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="manual" className="text-sm font-normal text-gray-800">
                                    Manually
                                </label>
                            </div>
                        </div>

                        <div className='pt-4'>
                            <h3 className="text-sm font-semibold text-gray-800">Progress</h3>

                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="any"
                                value={taskProgress}
                                disabled={isCheckedSubtask}
                                onChange={(event) => handleOnProgressChange(event)}
                                className={`
                                    w-full h-full pt-2 appearance-none cursor-pointer bg-transparent z-30
                                    ${isCheckedSubtask ? 'progress-disabled-input' : ''}
                                    [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:appearance-none
                                    [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:appearance-none
                                    [&::-ms-thumb]:bg-blue-600 [&::-ms-thumb]:rounded-full [&::-ms-thumb]:border-0 [&::-ms-thumb]:w-2.5 [&::-ms-thumb]:h-2.5 [&::-ms-thumb]:appearance-none
                                    [&::-webkit-slider-runnable-track]:bg-neutral-200 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:overflow-hidden
                                    [&::-moz-range-track]:bg-neutral-200 [&::-moz-range-track]:rounded-full
                                    [&::-ms-track]:bg-neutral-200 [&::-ms-track]:rounded-full
                                    [&::-moz-range-progress]:bg-blue-400 [&::-moz-range-progress]:rounded-full
                                    [&::-ms-fill-lower]:bg-blue-400 [&::-ms-fill-lower]:rounded-full
                                    [&::-webkit-slider-thumb]:shadow-[-999px_0px_0px_990px_#4e97ff]
                                `}
                            />
                            <div
                                style={labelStyle}
                                className={`
                                    ${isCheckedSubtask ? 'progress-disabled-div' : ''}
                                    inline-block mt-1 py-0.5 px-1.5 bg-blue-50 border border-blue-200 text-xs font-medium text-blue-600 rounded-lg
                                `}
                            >
                                {taskProgress}%
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};