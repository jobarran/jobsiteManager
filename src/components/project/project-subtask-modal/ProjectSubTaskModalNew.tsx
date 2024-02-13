'use client'

import { ModalType, SubTask, SubTaskPriority, SubTaskStatus, Task } from "@/interfaces";
import { createSubTask, getTaskById } from "@/actions";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";
import Datepicker from "react-tailwindcss-datepicker";
import { useProjectStore } from "@/store";
import { FaSave } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';



interface Props {
    isOpen: boolean
    onClose: () => void
}

type FormInputs = {
    name: string,
    location: string
    contractor: string
    start: string
    end: string
    description: string
    priority: SubTaskPriority
    status: SubTaskStatus
    taskId: string
}

interface TaskWithId extends Task {
    id: string;
}


export const ProjectSubTaskModalNew = () => {

    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()

    // const taskModalData = useProjectStore(state => state.taskModalData)
    const closeSubTaskModal = useProjectStore(state => state.closeSubTaskModal)
    const isSubTaskModalOpen = useProjectStore(state => state.isSubTaskModalOpen)
    const openTaskModal = useProjectStore(state => state.openTaskModal)
    const setActiveTaskId = useProjectStore(state => state.setActiveTaskId)
    const activeProjectTasks = useProjectStore(state => state.activeProjectTasks)
    const activeTaskId = useProjectStore(state => state.activeTaskId)
    const setProjectTasks = useProjectStore(state => state.setProjectTasks)


    const taskModalData = activeProjectTasks?.find(task => task.id === activeTaskId)

    const [value, setValue] = useState({
        startDate: '',
        endDate: ''
    });

    const handleValueChange = (newValue: any) => {
        setValue(newValue);
    }

    const updateProjectTasks = (subTask: SubTask | undefined) => {
        if (subTask === undefined) {
            console.error("subTask is undefined");
            return;
        }

        const taskToUpdate = activeProjectTasks?.find(task => task.id === activeTaskId);

        if (!taskToUpdate) {
            console.error("Task not found");
            return;
        }

        const updatedSubTasks = [...taskToUpdate.subTasks, subTask];

        const updatedActiveProjectTasks = (activeProjectTasks || []).map(task => {
            if (task.id === activeTaskId) {
                return { ...task, subTasks: updatedSubTasks };
            }
            return task;
        });

        setProjectTasks(updatedActiveProjectTasks);
    };

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {

        setErrorMessage('')

        if (taskModalData !== null) {

            const resp = await createSubTask({
                name: data.name,
                location: data.location,
                description: data.description,
                incidence: '0',
                contractor: data.contractor,
                progress: '0%',
                start: value.startDate,
                end: value.endDate,
                priority: data.priority,
                status: data.status,
                taskId: taskModalData?.id || '',
            })

            if (!resp.ok) {
                setErrorMessage('Cannot create task')
                return
            }

            const { task } = await getTaskById(taskModalData?.id!);
            const subTask = resp.subTask

            if (task === undefined) {
                console.log('Task not found');
                return;
            }
            setActiveTaskId(task.id)
            openTaskModal(ModalType.Edit)
            closeSubTaskModal();
            updateProjectTasks(subTask)

        } else {
            console.log('taskModalData is null');
        }
    }


    const modalClasses = isSubTaskModalOpen
        ? 'fixed top-0 right-0 bottom-0 flex flex-col w-full h-screen transition-right-left duration-300 transform translate-x-0 bg-white z-50'
        : 'fixed top-0 left-full bottom-0 flex flex-col w-full h-screen transition-right-left duration-300 transform translate-x-full bg-white';

    return (
        // <div
        //     id="add-task-modal"
        //     tabIndex={-1}
        //     aria-hidden="true"
        //     className={modalClasses}
        // >

            // <div className="p-6 md:p-5 border-l dark:border-gray-600 h-full max-h-full overflow-y-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                    <div className="flex items-center justify-between py-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-normal text-gray-900">
                            New <span className="font-extrabold">Subtask</span>
                        </h3>
                        <div className="flex">
                            <div className="flex justify-end space-x-1">
                                <button
                                    type="submit"
                                    className={`bg-transparent rounded-lg text-lg w-6 h-6 inline-flex justify-center items-center text-sky-700`}
                                >
                                    <FaSave />
                                    <span className="sr-only">Save</span>
                                </button>
                                <button
                                    type="button"
                                    className="text-red-700 bg-transparent rounded-lg text-lg w-6 h-6 inline-flex justify-center items-center"
                                    data-modal-toggle="crud-modal"
                                    onClick={closeSubTaskModal}
                                >
                                    <FaX />
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 mb-4 grid-cols-2 "></div>


                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Subtask Name</label>
                        <input
                            type="name"
                            id="name"
                            placeholder="Subtask 01"
                            className={
                                clsx(
                                    "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5",
                                    {
                                        'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                                    }
                                )
                            }
                            {...register('name', {
                                required: true,
                            })
                            }
                        />
                    </div>

                    <div>
                        <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">Location</label>
                        <input
                            type="location"
                            id="location"
                            placeholder="Kitchen, bedroom ..."
                            className={
                                clsx(
                                    "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5",
                                    {
                                        'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                                    }
                                )
                            }
                            {...register('location', {
                                required: true,
                            })
                            }
                        />
                    </div>

                    <div>
                        <label htmlFor="contractor" className="block mb-2 text-sm font-medium text-gray-900">contractor</label>
                        <input
                            type="contractor"
                            id="contractor"
                            placeholder="Contractor name"
                            className={
                                clsx(
                                    "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5",
                                    {
                                        'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                                    }
                                )
                            }
                            {...register('contractor', {
                                required: true,
                            })
                            }
                        />
                    </div>

                    <div>

                        <label htmlFor="start-end" className="block mb-2 text-sm font-medium text-gray-900">Start and End date</label>
                        <div className="relative">
                            <Datepicker
                                inputClassName="bg-gray-50 border text-gray-900 sm:text-sm rounded-lg  w-full h-10 p-2.5"
                                placeholder={"Select Dates"}
                                value={value}
                                onChange={handleValueChange}
                            />
                        </div>

                    </div>

                    <div>
                        <label htmlFor="priority" className="block mb-2 text-sm font-medium text-gray-900">Priority</label>
                        <select
                            id="priority"
                            className={
                                clsx(
                                    "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5",
                                    {
                                        'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                                    }
                                )
                            }
                            {...register('priority', {
                                required: true,
                            })
                            }
                        >
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                        <select
                            id="status"
                            className={
                                clsx(
                                    "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5",
                                    {
                                        'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                                    }
                                )
                            }
                            {...register('status', {
                                required: true,
                            })
                            }
                        >
                            <option value="upcoming">Upcoming</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="finished">Finished</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Project description</label>
                        <textarea
                            rows={3}
                            id="description"
                            placeholder="Description..."
                            className="bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block p-2.5 w-full text-sm "
                            {...register('description')}
                        ></textarea>
                    </div>

                </form>
            // </div>


        // </div>

    );
};

