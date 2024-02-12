'use client'

import { ProjectSubTaskIncidenceModal, ProjectSubTaskModal, ProjectTaskIncidenceModal, ProjectTaskModalAddNewTask, ProjectTaskModalDetail, ProjectTaskModalDistributionChart, ProjectTaskModalHeader, ProjectTaskModalOptions, ProjectTaskModalSubTaskData, StatusBadge } from "@/components";
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

    const taskModalData = activeProjectTasks?.find(task => task.id === activeTaskId)       

    return (
        <>
            {
                incidenceModalType === 'task'

                    ? <ProjectTaskIncidenceModal tasks={tasks} projectId={projectId} />
                    :
                    taskModalData
                        ? <ProjectSubTaskIncidenceModal />
                        : <></>
            }
        </>
    );
};