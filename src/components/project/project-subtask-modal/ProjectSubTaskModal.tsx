'use client'

import { ModalType } from "@/interfaces";
import { useProjectStore } from "@/store";
import { ProjectSubTaskModalNew } from "./ProjectSubTaskModalNew";
import { ProjectSubTaskModalDetail } from "./ProjectSubTaskModalDetail";


export const ProjectSubTaskModal = () => {

    const subTaskModalType = useProjectStore(state => state.subTaskModalType)
    const isSubTaskModalOpen = useProjectStore(state => state.isSubTaskModalOpen)


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

            <div className="p-4 md:p-5  border-l dark:border-gray-600 h-full overflow-y-auto">


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

