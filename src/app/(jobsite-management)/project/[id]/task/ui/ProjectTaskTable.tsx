'use client'

import { ProjectTableBody, ProjectTableHeader, ProjectTaskTableBody, ProjectTaskTableHeader } from '@/components'
import useQuickSearch from '@/hooks/useQuickSearch'
import React, { useState } from 'react'
import { Project, SubTask } from '@/interfaces'
import { getProgressBySubTaskIncidence } from '@/utils'

interface Props {
    tasks: any,
    projectId: string,
}

export const ProjectTaskTable = ({tasks, projectId }: Props) => {

    const [filteredData, setSearch, clearSearch, setNewData] = useQuickSearch(tasks);
    const [searchValue, setSearchValue] = useState('');

    const head = [ 'Location', 'Name', 'Status', 'Progress', 'Incidence', 'Contractor', 'End', 'Priority']

    const data = filteredData ? filteredData.map((task) => ({
        id: task.id,
        location: task.location,
        name: task.name,
        status: task.status,
        progress: Array.isArray(task.subTasks) ? getProgressBySubTaskIncidence(task.subTasks) : 0,
        incidence: task.incidence,
        contractor: task.contractor,
        end: task.end,
        priority: task.priority,
        subTasks: task.subTasks || []
    }))
        : [{
            location: '',
            name: '',
            status: '',
            progress: '',
            incidence: '',
            contractor: '',
            end: '',
            priority: '',
            subTasks: ''
        }];

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearch(value);
        setSearchValue(value);
    };

    const handleClearSearch = () => {
        clearSearch();
        setSearchValue('');
    };

    return (

        <div className="relative overflow-x-auto">

            <ProjectTaskTableHeader
                searchValue={searchValue}
                handleSearchChange={handleSearchChange}
                handleClearSearch={handleClearSearch}
                projectId={projectId}
                tasks={tasks}
            />

            <div>
                <ProjectTaskTableBody data={data} head={head} status={'ongoing'} projectId={projectId} />
                <ProjectTaskTableBody data={data} head={head} status={'upcoming'} projectId={projectId} />
                <ProjectTaskTableBody data={data} head={head} status={'finished'} projectId={projectId} />
            </div>

        </div>



    )
}
