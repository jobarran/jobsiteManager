import { ReducedTask, SubTask, Task } from '@/interfaces'
import { getProgressBySubTaskIncidence } from '.';



export const getProjectProgress = (tasks: Task[] | ReducedTask[] | undefined): number => {

    if (!Array.isArray(tasks)) {
        return 0;
    }

    let totalWeightedProgress = 0;
    let totalIncidence = 0;

    tasks.forEach(task => {
        const taskIncidence = parseFloat(task.incidence);
        if (!isNaN(taskIncidence)) {
            totalWeightedProgress += getProgressBySubTaskIncidence(task.subTasks) * taskIncidence;
            totalIncidence += taskIncidence;
        }
    });

    const projectProgress = totalIncidence > 0 ? totalWeightedProgress / totalIncidence : 0;

    return parseInt(projectProgress.toString());
};