'use client'

import { ProjectTaskModalDistributionChart, ProjectTaskModalHeader, ProjectTaskModalOptions, ProjectTaskModalSubTaskData, StatusBadge } from "@/components";
import { useState } from "react";

import ProjectTaskModalProgress from "./ProjectTaskModalProgress";
import { ProjectTaskModalSubTaskTable } from "./ProjectTaskModalSubTaskTable";


export const ProjectTaskModalDetail = () => {

    const [isEditable, setIsEditable] = useState(false)
    const [taskModalOption, setTaskModalOption] = useState<'list' | 'messages'>('list');

    const handleIsEditable = () => {
        setIsEditable(true)
    }

    return (

        <div className="relative">

            <ProjectTaskModalHeader
                handleIsEditable={handleIsEditable}
            />

            <div className="grid gap-4 mb-4 grid-cols-2 "></div>

            <ProjectTaskModalOptions
                taskModalOption={taskModalOption}
                setTaskModalOption={setTaskModalOption}
            />

            <div className="grid gap-4 mb-4 grid-cols-2 "></div>


            <div className="flex items-center">
                <ProjectTaskModalProgress />
                <ProjectTaskModalDistributionChart />
                <ProjectTaskModalSubTaskData />
            </div>

            <div className="grid gap-4 mb-4 grid-cols-2 "></div>

            <ProjectTaskModalSubTaskTable />


        </div>

    );


};