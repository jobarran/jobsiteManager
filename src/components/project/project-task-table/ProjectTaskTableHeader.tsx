'use client'

import { IncidenceModalType, ModalType, Task } from '@/interfaces'
import React, { useState } from 'react'
import { useProjectStore } from '@/store'
import { FaPercentage } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { ProjectIncidenceModal } from '@/components';



interface Props {
    searchValue: any,
    handleSearchChange: any,
    handleClearSearch: any,
    projectId: string,
    tasks: Task[]
}

export const ProjectTaskTableHeader = ({ searchValue, handleSearchChange, handleClearSearch, tasks, projectId }: Props) => {

    const openTaskModal = useProjectStore(state => state.openTaskModal)
    const closeSubTaskModal = useProjectStore(state => state.closeSubTaskModal)
    const openIncidenceModal = useProjectStore(state => state.openIncidenceModal)

    const handleOpenModal = () => {
        closeSubTaskModal()
        openTaskModal(ModalType.New)
    };

    const handleOpenIncidenceModal = () => {
        closeSubTaskModal()
        openIncidenceModal(IncidenceModalType.Task)
    };

    return (



        <div className="relative">

            <ProjectIncidenceModal tasks={tasks} projectId={projectId} />

            <div className="flex items-center justify-between pt-2 pb-4 flex-row space-y-0 space-x-4">
                <div className="w-full md:w-1/2">
                    <form className="flex items-center">
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="simple-search"
                                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Search"
                                value={searchValue ? searchValue : ''}
                                onChange={handleSearchChange}
                            />
                            {searchValue && (
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={handleClearSearch}
                                >
                                    <svg
                                        className="w-5 h-5 text-gray-500 cursor-pointer"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="flex justify-end flex-shrink-0 w-auto flex-row space-y-0 items-center space-x-3">

                    <button
                        className=" flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-lg md:w-auto hover:bg-gray-100 hover:text-primary-700s"
                        type="button"
                        onClick={handleOpenIncidenceModal}
                    >
                        <FaPercentage />
                        <p className='ml-2 hidden md:block'>Incidences</p>
                    </button>

                    <button
                        className=" flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-lg md:w-auto hover:bg-gray-100 hover:text-primary-700s"
                        type="button"
                        onClick={handleOpenModal}
                    >
                        <FaPlus />
                        <p className='ml-2 hidden md:block'>Add task</p>
                    </button>

                </div>
            </div>
        </div>

    )
}
