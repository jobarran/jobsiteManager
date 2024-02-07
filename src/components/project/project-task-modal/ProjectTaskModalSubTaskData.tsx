'use client'

import { Task } from '@/interfaces';
import { useUIStore } from '@/store';
import { countSubtasksWithStatus } from '@/utils';
import React, { useState, useEffect } from 'react';

export const ProjectTaskModalSubTaskData = () => {

    const taskModalData = useUIStore(state => state.taskModalData)


    const upcomingTasks = countSubtasksWithStatus(taskModalData?.subTasks, 'upcoming')
    const ongoingTasks = countSubtasksWithStatus(taskModalData?.subTasks, 'ongoing')
    const finishedTasks = countSubtasksWithStatus(taskModalData?.subTasks, 'finished')

    const statusBgColor = (status:any) => {
        switch (status) {
            case 'ongoing':
                return 'bg-sky-700'
            case 'upcoming':
                return 'bg-amber-600'
            case 'finished':
                return 'bg-lime-600'
            default:
                break;
        }
    }

    return (
        <div className="relative flex flex-col md:h-36 h-28 min-w-max justify-center ml-1">
            <p className="text-base font-semibold text-gray-600 relative">
                {/* <span className="absolute h-2 w-2 rounded-full bg-blue-500 left-0 top-1/2 transform -translate-y-1/2 animate-pulse"></span> */}
                <span className="inline-block">Total: <span className="font-normal text-gray-600">{taskModalData?.subTasks.length}</span></span>
            </p>
            <p className="text-sm font-semibold text-gray-400 relative">
                <span className={`absolute h-2 w-2 rounded-full ${statusBgColor('upcoming')} left-0 top-1/2 transform -translate-y-1/2 animate-pulse`}></span>
                <span className="inline-block ml-4">Upcoming: <span className="text-gray-400">{upcomingTasks}</span></span>
            </p>
            <p className="text-sm font-semibold text-gray-400 relative">
            <span className={`absolute h-2 w-2 rounded-full ${statusBgColor('ongoing')} left-0 top-1/2 transform -translate-y-1/2 animate-pulse`}></span>
                <span className="inline-block ml-4">Ongoing: <span className="text-gray-400">{ongoingTasks}</span></span>
            </p>
            <p className="text-sm font-semibold text-gray-400 relative">
            <span className={`absolute h-2 w-2 rounded-full ${statusBgColor('finished')} left-0 top-1/2 transform -translate-y-1/2 animate-pulse`}></span>
                <span className="inline-block ml-4">Finished: <span className="text-gray-400">{finishedTasks}</span></span>
            </p>
        </div>
    );
};



