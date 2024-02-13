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
        ? 'fixed top-0 right-0 bottom-0 left-0 flex flex-col w-full h-full p-4 md:p-5 overflow-y-auto bg-white z-30'
        : 'hidden';

    return (
        <div
            id="add-task-modal"
            aria-hidden={!isTaskModalOpen}
            className={modalClasses}
        >
            <ProjectSubTaskModal />
            <div className="border-l dark:border-gray-600">
                {taskModalType === ModalType.New ?
                    <ProjectTaskModalAddNewTask
                        isOpen={isTaskModalOpen}
                        onClose={handleCloseModal}
                        projectId={projectId}
                    /> :
                    <ProjectTaskModalDetail />
                }
            </div>
        </div>
    );
};