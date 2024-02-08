import { Task } from "@prisma/client";

export const checkTaskIncidenceSum = (updatedTasks:Task[]) => {
    const sum = updatedTasks.reduce((acc, task) => acc + parseInt(task.incidence), 0);
    console.log(sum)
    return sum === 100;
};