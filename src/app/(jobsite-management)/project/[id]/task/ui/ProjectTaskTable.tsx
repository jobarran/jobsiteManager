'use client'

import { ProjectTableBody, ProjectTableHeader, ProjectTaskTableBody, ProjectTaskTableHeader } from '@/components'
import useQuickSearch from '@/hooks/useQuickSearch'
import React, { useEffect, useState } from 'react'
import { Project, SubTask } from '@/interfaces'
import { getProgressBySubTaskIncidence } from '@/utils'
import { useProjectStore } from '@/store'

interface Props {
    tasks: any,
    projectId: string,
}

export const ProjectTaskTable = ({ tasks, projectId }: Props) => {

    const [searchValue, setSearchValue] = useState('');

    const setProjectTasks = useProjectStore(state => state.setProjectTasks)
    const activeProjectTasks = useProjectStore(state => state.activeProjectTasks)

    const [filteredData, setSearch, clearSearch, setNewData] = useQuickSearch(activeProjectTasks || tasks);

    useEffect(() => {
        if (!activeProjectTasks) {
            setProjectTasks(tasks)
            console.log('fetching tasks')
        }
    }, [])

    useEffect(() => {
        setNewData(activeProjectTasks)
        console.log('RE-fetching tasks')
    }, [activeProjectTasks])



    const head = ['Name', 'Location', 'Progress', 'Incidence', 'Contractor', 'End', 'Priority']


    const data = filteredData ? filteredData.map((task) => ({
        id: task.id,
        location: task.location,
        name: task.name,
        status: task.status,
        progress: task.progress === '0' ?
            (Array.isArray(task.subTasks) ? getProgressBySubTaskIncidence(task.subTasks) : '0')
            : parseInt(task.progress.toString()),
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
                <ProjectTaskTableBody data={data} head={head} status={'ongoing'} />
                <ProjectTaskTableBody data={data} head={head} status={'upcoming'} />
                <ProjectTaskTableBody data={data} head={head} status={'finished'} />
            </div>

        </div>



    )
}
