'use client'

import { ProjectSubTaskModal, ProjectTaskModalAddNewTask, ProjectTaskModalDetail, ProjectTaskModalDistributionChart, ProjectTaskModalHeader, ProjectTaskModalOptions, ProjectTaskModalSubTaskData, StatusBadge } from "@/components";
import { ModalType } from "@/interfaces";
import { useProjectStore } from "@/store";


interface Props {
    projectId: string
}

export const ProjectTaskModal = ({ projectId }: Props) => {

    const taskModalType = useProjectStore(state => state.taskModalType)
    const closeTaskModal = useProjectStore(state => state.closeTaskModal)
    const isTaskModalOpen = useProjectStore(state => state.isTaskModalOpen)


    const handleCloseModal = () => {
        closeTaskModal()
    };

    const modalClasses = isTaskModalOpen
        ? 'fixed top-0 right-0 bottom-0 flex flex-col w-full lg:w-1/3 h-screen transition-right-left duration-300 transform translate-x-0 bg-white z-30'
        : 'fixed top-0 left-full bottom-0 flex flex-col w-full lg:w-1/3 h-screen transition-right-left duration-300 transform translate-x-full bg-white';

    return (
        <>
            <div
                id="add-task-modal"
                tabIndex={-1}
                aria-hidden="true"
                className={modalClasses}
            >
                <ProjectSubTaskModal />

                <div className="p-4 md:p-5 border-l dark:border-gray-600 h-full">

                    {
                        taskModalType === ModalType.New
                            ?
                            <ProjectTaskModalAddNewTask
                                isOpen={isTaskModalOpen}
                                onClose={handleCloseModal}
                                projectId={projectId}
                            />
                            :
                            <ProjectTaskModalDetail />
                    }



                </div>


            </div>





        </>


    );


};