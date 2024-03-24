import { Task } from '@/interfaces'
import React from 'react'

interface Props {
    task: Task
}

export const ProjectDashboardChartProgressBar = ({ task }: Props) => {


    const handleTaskProgress = () => {
        if (task.progress !== '0') {
            return task.progress + '%'
        } else
        if (task.subTasks && task.subTasks.length > 0) {
            // Calculate total weighted progress
            const totalWeightedProgress = task.subTasks.reduce((total, subtask) => {
                const progress = parseInt(subtask.progress); // Parse progress to integer
                const incidence = parseInt(subtask.incidence); // Parse incidence to integer
                return total + (progress * incidence); // Calculate weighted progress
            }, 0);

            // Calculate total weighted incidence
            const totalWeightedIncidence = task.subTasks.reduce((total, subtask) => {
                return total + parseInt(subtask.incidence); // Parse incidence to integer
            }, 0);

            // Calculate total progress percentage
            const totalProgress = (totalWeightedProgress / totalWeightedIncidence) || 0; // Avoid division by zero
            return totalProgress.toFixed(0) + '%'; // Return the percentage with '%' sign
        }
        return '0%'; // If there are no subTasks or task is null, return '0%'
    }

    const handleOngoingProgress = () => {
        if (task.subTasks && task.subTasks.length > 0) {

            const ongoingSubtasks = task.subTasks.filter(subtask => subtask.status === 'ongoing');
            const totalIncidence = ongoingSubtasks.reduce((total, subtask) => total + parseInt(subtask.incidence), 0);
            return totalIncidence + '%';
        }
        return '0%';
    };

    const handleFinishedProgress = () => {
        if (task.subTasks && task.subTasks.length > 0) {

            const finishedSubtasks = task.subTasks.filter(subtask => subtask.status === 'finished');
            const totalIncidence = finishedSubtasks.reduce((total, subtask) => total + parseInt(subtask.incidence), 0);
            return totalIncidence + '%';
        }
        return '0%';
    };

    const handleUpcomingProgress = () => {
        if (task.subTasks && task.subTasks.length > 0) {

            const upcomingSubtasks = task.subTasks.filter(subtask => subtask.status === 'upcoming');
            const totalIncidence = upcomingSubtasks.reduce((total, subtask) => total + parseInt(subtask.incidence), 0);
            return totalIncidence + '%';
        }
        return '0%';
    };


    return (

        <div className="grid grid-cols-12 gap-2">
            <div className="col-span-2 flex items-center">
                <span className="text-sm text-gray-500">{task.name}</span>
            </div>
            <div className="col-span-10">

                <div className="mb-1 h-5 w-full bg-neutral-200 rounded-full">
                    <div
                    className="flex flex-col justify-center h-5 bg-sky-700 rounded-full text-xs text-white text-center whitespace-nowrap"
                    style={{ width: handleTaskProgress() }}
                    >
                        {handleTaskProgress()}
                    </div>
                </div>

                <div className="flex w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="flex flex-col justify-center bg-lime-600 text-xs text-white text-center whitespace-nowrap"
                        style={{ width: handleFinishedProgress() }}
                        role="progressbar"
                    >
                    </div>
                    <div
                        className="flex flex-col justify-center bg-sky-700 text-xs text-white text-center whitespace-nowrap"
                        style={{ width: handleOngoingProgress() }}
                        role="progressbar"
                    >
                    </div>
                    <div
                        className="flex flex-col justify-center bg-amber-600 text-xs text-white text-center whitespace-nowrap dark:bg-white"
                        style={{ width: handleUpcomingProgress() }}
                        role="progressbar"
                    >
                    </div>
                </div>
            </div>
        </div>

    )
}
