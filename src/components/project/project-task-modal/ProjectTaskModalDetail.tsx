'use client'

import { ProjectTaskModalDistributionChart, ProjectTaskModalHeader, ProjectTaskModalOptions, ProjectTaskModalSubTaskData, StatusBadge } from "@/components";
import { useState } from "react";

import ProjectTaskModalProgress from "./ProjectTaskModalProgress";
import { ProjectTaskModalSubTaskTable } from "./ProjectTaskModalSubTaskTable";
import { useProjectStore } from "@/store";


export const ProjectTaskModalDetail = () => {

    const [isEditable, setIsEditable] = useState(false)

    const activeProjectTasks = useProjectStore(state => state.activeProjectTasks)
    const activeTaskId = useProjectStore(state => state.activeTaskId)
    const taskModalData = activeProjectTasks?.find(task => task.id === activeTaskId)


    const handleIsEditable = () => {
        setIsEditable(true)
    }

    const taskProgressHandled = () => {
        if (taskModalData?.progress === '0') {
            return 'automatically'
        } else return 'manually'
    }

    return (

        <div className="relative">

            <ProjectTaskModalHeader
                handleIsEditable={handleIsEditable}
            />

            <div className="grid gap-4 mb-4 grid-cols-2 "></div>

            <ProjectTaskModalOptions />

            <div className="grid gap-4 mb-4 grid-cols-2 "></div>


            <div className="flex items-center">
                <ProjectTaskModalProgress />
                <ProjectTaskModalDistributionChart />
                <ProjectTaskModalSubTaskData />
            </div>

            <p className="text-xs text-gray-900 italic">
                Progress is being handled <strong className="font-bold">{taskProgressHandled()}</strong>
            </p>
            <div className="grid gap-4 mb-4 grid-cols-2 "></div>

            <ProjectTaskModalSubTaskTable />


        </div>

    );


};