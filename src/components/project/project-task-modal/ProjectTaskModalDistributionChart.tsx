'use client'

import { useProjectStore } from '@/store';
import { countSubtasksWithStatus } from '@/utils';
import React, { useState, useEffect } from 'react';


export const ProjectTaskModalDistributionChart = () => {

    // const taskModalData = useProjectStore(state => state.taskModalData)
    const activeProjectTasks = useProjectStore(state => state.activeProjectTasks)
    const activeTaskId = useProjectStore(state => state.activeTaskId)

    const taskModalData = activeProjectTasks?.find(task => task.id === activeTaskId)

    const upcomingTasks = countSubtasksWithStatus(taskModalData?.subTasks, 'upcoming')
    const ongoingTasks = countSubtasksWithStatus(taskModalData?.subTasks, 'ongoing')
    const finishedTasks = countSubtasksWithStatus(taskModalData?.subTasks, 'finished')


    const total = upcomingTasks + ongoingTasks + finishedTasks;
    const upcomingOffset = (upcomingTasks !== 0 ? (upcomingTasks / total) * 100 : 0);
    const ongoingOffset = (ongoingTasks !== 0 ? (ongoingTasks / total) * 100 : 0);
    const finishedOffset = (finishedTasks !== 0 ? (finishedTasks / total) * 100 : 0);

    const [distribution, setDistribution] = useState({
        total: 0,
        upcomingOffset: 100,
        ongoingOffset: 100,
        finishedOffset: 100
    });

    const totalTransition = () => {
        setDistribution(prevState => ({
            ...prevState,
            total: 100
        }));
        setTimeout(() => {
            setDistribution(prevState => ({
                ...prevState,
                total: total
            }));
        }, 500);
    }

    useEffect(() => {
        setDistribution({
            total: total,
            upcomingOffset: 100,
            ongoingOffset: 100,
            finishedOffset: 100
        });
        const timer = setTimeout(() => {
            setDistribution({
                total: total,
                upcomingOffset: upcomingOffset,
                ongoingOffset: ongoingOffset,
                finishedOffset: finishedOffset
            });
        }, 500);
        return () => clearTimeout(timer);
    }, [taskModalData]);





    return (
        <div className="relative h-28 md:h-36 p-2 mx-1">
            <svg className="h-full w-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current text-gray-200"
                    strokeWidth="4"
                ></circle>

                <g className="origin-center -rotate-90 transform">
                    <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        className="distribution-ring distribution-amber"
                        strokeWidth="4"
                        strokeDasharray='100'
                        strokeDashoffset='0'>
                    </circle>
                </g>

                <g className="origin-center -rotate-90 transform">
                    <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        className="distribution-ring distribution-sky"
                        strokeWidth="4"
                        strokeDasharray='100'
                        strokeDashoffset={distribution.upcomingOffset}>
                    </circle>
                </g>

                <g className="origin-center -rotate-90 transform">
                    <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        className="distribution-ring distribution-lime"
                        strokeWidth="4"
                        strokeDasharray='100'
                        strokeDashoffset={distribution.upcomingOffset + distribution.ongoingOffset}>
                    </circle>
                </g>

                <g className="origin-center -rotate-90 transform">
                    <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        className={`distribution-ring ${total === 0 ? 'distribution-gray' : 'hidden' }`}
                        strokeWidth="4"
                        strokeDasharray='100'
                        strokeDashoffset='0'>
                    </circle>
                </g>



            </svg>
            <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <span className="text-center text-2xl font-semibold text-gray-700">{distribution.total}</span>
            </div>
        </div>
    );
};



