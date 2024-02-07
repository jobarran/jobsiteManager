'use client'

import { ModalType, SubTaskPriority, SubTaskStatus, Task } from "@/interfaces";
import { MdEdit } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { createSubTask } from "@/actions";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";
import Datepicker from "react-tailwindcss-datepicker";
import { useUIStore } from "@/store";
import { ProjectSubTaskModalNew } from "./ProjectSubTaskModalNew";
import { ProjectSubTaskModalDetail } from "./ProjectSubTaskModalDetail";


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


export const ProjectSubTaskModal = () => {

    const subTaskModalType = useUIStore(state => state.subTaskModalType)
    const isSubTaskModalOpen = useUIStore(state => state.isSubTaskModalOpen)


    const modalClasses = isSubTaskModalOpen
        ? 'fixed top-0 right-0 bottom-0 flex flex-col w-full h-screen transition-right-left duration-300 transform translate-x-0 bg-white z-50'
        : 'fixed top-0 left-full bottom-0 flex flex-col w-full h-screen transition-right-left duration-300 transform translate-x-full bg-white';

    return (
        <div
            id="add-task-modal"
            tabIndex={-1}
            aria-hidden="true"
            className={modalClasses}
        >

            <div className="p-4 md:p-5  border-l dark:border-gray-600 h-full">


                {
                    subTaskModalType === ModalType.New
                        ?
                        <ProjectSubTaskModalNew />
                        :
                        <ProjectSubTaskModalDetail />
                }



            </div>


        </div>

    );
};

