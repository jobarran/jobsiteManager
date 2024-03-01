'use client'

import { ProjectSubTaskIncidenceModal, ProjectSubTaskModal, ProjectTaskIncidenceModal, ProjectTaskModalAddNewTask, ProjectTaskModalDetail, ProjectTaskModalDistributionChart, ProjectTaskModalHeader, ProjectTaskModalOptions, ProjectTaskModalSubTaskData, ProjectTaskProgressModal, StatusBadge } from "@/components";
import { Task } from "@/interfaces";
import { useProjectStore } from "@/store";

interface Props {
    tasks: Task[],
    projectId: string
}

export const ProjectIncidenceModal = ({ tasks, projectId }: Props) => {

    const incidenceModalType = useProjectStore(state => state.incidenceModalType)
    // const taskModalData = useProjectStore(state => state.taskModalData)
    const activeProjectTasks = useProjectStore(state => state.activeProjectTasks)
    const activeTaskId = useProjectStore(state => state.activeTaskId)

    let modalComponent = null;

    switch (incidenceModalType) {
        case 'task':
            modalComponent = <ProjectTaskIncidenceModal />;
            break;
        case 'subtask':
            modalComponent = <ProjectSubTaskIncidenceModal />;
            break;
        case 'progress':
            modalComponent = <ProjectTaskProgressModal />;
            break;
        default:
            modalComponent = null; // Handle other cases if needed
    }

    return (
        <>
            {modalComponent}
        </>
    );
};