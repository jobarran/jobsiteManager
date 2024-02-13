'use client'

import { ModalType } from "@/interfaces";
import { useProjectStore } from "@/store";
import { ProjectSubTaskModalNew } from "./ProjectSubTaskModalNew";
import { ProjectSubTaskModalDetail } from "./ProjectSubTaskModalDetail";


export const ProjectSubTaskModal = () => {

    const subTaskModalType = useProjectStore(state => state.subTaskModalType)
    const isSubTaskModalOpen = useProjectStore(state => state.isSubTaskModalOpen)


    const modalClasses = isSubTaskModalOpen
        ? 'fixed top-0 right-0 flex flex-col p-6 md:p-5 border-l border-gray-200 w-full h-full transition-right-left duration-300 transform translate-x-0 bg-white z-50 overflow-y-auto'
        : 'fixed top-0 left-full flex flex-col p-4 md:p-5 border-l border-gray-200 w-full h-full transition-right-left duration-300 transform translate-x-full bg-white overflow-y-auto';

    return (
        <div
            id="add-task-modal"
            tabIndex={-1}
            aria-hidden="true"
            className={modalClasses}
        >

            {
                subTaskModalType === ModalType.New
                    ?
                    <ProjectSubTaskModalNew />
                    :
                    <ProjectSubTaskModalDetail />
            }

        </div>

    );
};

