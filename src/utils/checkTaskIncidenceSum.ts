import { Task } from "@prisma/client";

export const checkTaskIncidenceSum = (updatedTasks:Task[]) => {
    const sum = updatedTasks.reduce((acc, task) => acc + parseInt(task.incidence), 0);
    return sum === 100;
};