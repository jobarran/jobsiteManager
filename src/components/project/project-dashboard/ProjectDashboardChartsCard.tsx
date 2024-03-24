'use client'


import React from 'react';
import { ProjectDashboardChartProgressBar } from './ProjectDashboardChartProgressBar';
import { useProjectStore } from '@/store';
import { Task } from '@/interfaces';
import { isTemplateHead } from 'typescript';

export const ProjectDashboardChartsCard = () => {

    const activeProjectTasks = useProjectStore(state => state.activeProjectTasks)

    // Check if activeProjectTasks is null
    if (activeProjectTasks === null) {
        return null; // or return some loading indicator, error message, or empty state
    }

    // Proceed only if activeProjectTasks is not null
    return (
        <div className="w-full p-4 border border-gray-100 bg-white rounded-lg sm:p-8">
            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Progress</h5>

            <div className="space-y-4">
                

                {activeProjectTasks.map((item: Task, index: number) => (
                    <ProjectDashboardChartProgressBar
                        key={index}
                        task={item}
                    />
                ))}
            </div>
        </div>
    );
};