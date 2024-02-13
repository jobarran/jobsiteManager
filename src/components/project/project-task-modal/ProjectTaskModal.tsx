'use client'

import { ProjectSubTaskModal, ProjectTaskModalAddNewTask, ProjectTaskModalDetail, ProjectTaskModalDistributionChart, ProjectTaskModalHeader, ProjectTaskModalOptions, ProjectTaskModalSubTaskData, StatusBadge } from "@/components";
import { ModalType } from "@/interfaces";
import { useProjectStore } from "@/store";

export const ProjectTaskModal = () => {

    const taskModalType = useProjectStore(state => state.taskModalType)
    const isTaskModalOpen = useProjectStore(state => state.isTaskModalOpen)
    const activeProject = useProjectStore(state => state.activeProject)


    const modalClasses = isTaskModalOpen
        ? 'fixed top-0 right-0 flex flex-col p-6 md:p-5 w-full lg:w-1/3 h-full border-l dark:border-gray-200 transition-right-left duration-300 transform translate-x-0 bg-white z-30 overflow-y-auto overflow-x-hidden' 
        : 'fixed top-0 left-full flex flex-col p-6 md:p-5 w-full lg:w-1/3 h-full border-l dark:border-gray-200 transition-right-left duration-300 transform translate-x-full bg-white overflow-y-auto overflow-x-hidden'

    return (

        <div
            id="add-task-modal"
            tabIndex={-1}
            aria-hidden="true"
            className={modalClasses}
        >
            <ProjectSubTaskModal />


            {
                taskModalType === ModalType.New
                    ?
                    <ProjectTaskModalAddNewTask />
                    :
                    <ProjectTaskModalDetail />
            }

        </div>

    );


};