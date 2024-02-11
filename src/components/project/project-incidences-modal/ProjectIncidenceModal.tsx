'use client'

import { getProjectTasksById } from "@/actions";
import { updateTaskIncidence } from "@/actions/task/update-task-incidence";
import { ProjectSubTaskIncidenceModal, ProjectSubTaskModal, ProjectTaskIncidenceModal, ProjectTaskModalAddNewTask, ProjectTaskModalDetail, ProjectTaskModalDistributionChart, ProjectTaskModalHeader, ProjectTaskModalOptions, ProjectTaskModalSubTaskData, StatusBadge } from "@/components";
import { ModalType, Task } from "@/interfaces";
import { useUIStore } from "@/store";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { IoClose } from 'react-icons/io5';
import { FaSave } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { IoAlertCircle } from "react-icons/io5";


interface Props {
    tasks: Task[],
    projectId: string
}

export const ProjectIncidenceModal = ({ tasks, projectId }: Props) => {

    const incidenceModalType = useUIStore(state => state.incidenceModalType)
    const taskModalData = useUIStore(state => state.taskModalData)

    return (
        <>
            {
                incidenceModalType === 'task'

                    ? <ProjectTaskIncidenceModal tasks={tasks} projectId={projectId} />
                    :
                    taskModalData
                        ? <ProjectSubTaskIncidenceModal subtasks={taskModalData.subTasks} taskId={taskModalData.id ? taskModalData.id : ''} />
                        : <></>
            }
        </>
    );
};