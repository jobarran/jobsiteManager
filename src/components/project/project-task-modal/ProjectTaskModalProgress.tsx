'use client'

import { useProjectStore } from '@/store';
import { getProgressBySubTaskIncidence } from '@/utils';
import React, { useState, useEffect } from 'react';

const ProjectTaskModalProgress = () => {

    const activeProjectTasks = useProjectStore(state => state.activeProjectTasks)
    const activeTaskId = useProjectStore(state => state.activeTaskId)

    const taskModalData = activeProjectTasks?.find(task => task.id === activeTaskId)

    const progressBySubTaskIncidence = getProgressBySubTaskIncidence(taskModalData?.subTasks)
    const progressManually = parseInt(taskModalData?.progress || "0", 10)

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setProgress(0);
        const timer = setTimeout(() => {
            if (progressManually > 0) {
                setProgress(progressManually)
            } else {
                setProgress(progressBySubTaskIncidence);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [progressBySubTaskIncidence, progressManually]);

    return (
        <div className="relative h-28 md:h-36 p-2 mr-1">
            <svg className="h-full w-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200" strokeWidth="4"></circle>
                <g className="origin-center -rotate-90 transform">
                    <circle
                        cx="18" cy="18" r="16" fill="none"
                        className="progress-ring"
                        strokeWidth="4"
                        strokeDasharray="100"
                        strokeDashoffset={100 - progress}
                    ></circle>
                </g>
            </svg>
            <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <span className="text-center text-2xl font-semibold text-gray-700">{progress.toFixed(0)}%</span>
            </div>
        </div>
    );
};

export default ProjectTaskModalProgress;


