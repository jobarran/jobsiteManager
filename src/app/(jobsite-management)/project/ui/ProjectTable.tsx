'use client'

import { ProjectTableBody, ProjectTableHeader } from '@/components'
import useQuickSearch from '@/hooks/useQuickSearch'
import { Project } from '@/interfaces'
import React, { useState } from 'react'

export const ProjectTable = (projects: any) => {

    const [filteredData, setSearch, clearSearch, setNewData] = useQuickSearch(projects.projects);
    const [searchValue, setSearchValue] = useState('');

    const head = ['Name', 'End', 'Workers', 'Progress', 'Leader', 'Actions']

    const data = filteredData ? filteredData.map((project) => ({
        name: project.name,
        end: '16/08/2024',
        workers: '6',
        progress: '70%',
        leader: 'JB',
        status: project.status,
        id: project.id
    }))
        : [{
            name: '',
            end: '',
            workers: '',
            progress: '',
            leader: '',
            status: '',
            id: ''
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

            <ProjectTableHeader
                searchValue={searchValue}
                handleSearchChange={handleSearchChange}
                handleClearSearch={handleClearSearch}
            />

            <div>
                <ProjectTableBody data={data} head={head} status={'ongoing'} />
                <ProjectTableBody data={data} head={head} status={'upcoming'} />
                <ProjectTableBody data={data} head={head} status={'finished'} />
            </div>

        </div>



    )
}
