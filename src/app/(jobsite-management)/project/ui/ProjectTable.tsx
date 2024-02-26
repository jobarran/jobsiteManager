'use client'

import { ProjectTableBody, ProjectTableHeader } from '@/components'
import useQuickSearch from '@/hooks/useQuickSearch'
import { FetchProject, Project } from '@/interfaces'
import { useCompanyStore, useProjectStore } from '@/store'
import { getInitials, getProjectProgress } from '@/utils'
import React, { useEffect, useState } from 'react'

interface Props {
    projects: FetchProject[];
}

export const ProjectTable: React.FC<Props> = ({ projects }) => {
    
    const unSetProject = useProjectStore(state => state.unSetProject)
    const setActiveCompanyProjects = useCompanyStore((state) => state.setActiveCompanyProjects)
    const [companyProjects, setCompanyProjects] = useState<FetchProject[]>([])

    useEffect(() => {
        setCompanyProjects(projects)
        setActiveCompanyProjects(projects)
        unSetProject();
    }, []);

    useEffect(() => {
        setCompanyProjects(projects)
        //TOdo: setNewData (useQuickSearch)
        unSetProject();
    }, [companyProjects]);

    // const [filteredData, setSearch, clearSearch, setNewData] = useQuickSearch({ projects });
    const [searchValue, setSearchValue] = useState('');

    const head = ['Name', 'Location', 'End', 'Workers', 'Progress', 'Leader', 'Shortcuts']

    const data = companyProjects ? companyProjects.map((project) => ({
        name: project.name,
        location: project.location || '', // Handle possible null values
        end: project.end,
        workers: '8',
        progress: Array.isArray(project.tasks) ? getProjectProgress(project.tasks) : 0,
        leader: getInitials(`${project.leader?.name || ''} ${project.leader?.lastName || ''}`),
        status: project.status,
        id: project.id
    })) : [{
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
        // setSearch(value);
        setSearchValue(value);
    };

    const handleClearSearch = () => {
        // clearSearch();
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
