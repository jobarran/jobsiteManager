import { SubTask } from '@/interfaces'



export const getProgressBySubTaskIncidence = (subTasks: SubTask[] | undefined): number => {

    if (!subTasks || subTasks.length === 0 || subTasks === undefined ) {
        return 0;
    }

    let totalWeightedProgress = 0;
    let totalIncidence = 0;

    // Calculate the total weighted progress and total incidence
    for (const subTask of subTasks) {
        if (subTask) {
            // Convert progress and incidence strings to numbers
            const progress = parseFloat(subTask.progress);
            const incidence = parseFloat(subTask.incidence);

            // Check if parsing was successful
            if (!isNaN(progress) && !isNaN(incidence)) {
                // Normalize incidence to be between 0 and 1
                const normalizedIncidence = incidence / 100;
                totalWeightedProgress += (progress * normalizedIncidence);
                totalIncidence += normalizedIncidence;
            }
        }
    }

    // Calculate the global progress
    const globalProgress = (totalWeightedProgress / totalIncidence) || 0;

    return globalProgress;
  

}
