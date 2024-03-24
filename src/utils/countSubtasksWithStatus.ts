import { SubTask, SubTaskStatus } from "@/interfaces";


export const countSubtasksWithStatus = (subTasks: SubTask[] | undefined, status: SubTaskStatus): number => {
    
    
    // Check if subTasks is null or undefined
    if (subTasks === null || subTasks === undefined) {
        return 0; // Return 0 if subTasks is null or undefined
    }

    // Initialize counter for subtasks with the given status
    let count: number = 0;

    // Iterate through subtasks array
    for (let subtask of subTasks) {
        // Check if the subtask has a "status" property and if it matches the given status
        if (subtask.status === status) {
            count++; // Increment count if status matches
        }
    }

    return count;
}