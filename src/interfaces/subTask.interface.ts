

export interface SubTask {
    id?:string
    name: string;
    location: string;
    description: string;
    incidence: string;
    contractor: string;
    progress: string;
    start: string;
    end: string;
    priority: SubTaskPriority;
    status: SubTaskStatus;
    taskId: string;
}

export type SubTaskStatus = 'ongoing' | 'finished' | 'upcoming' | '';
export type SubTaskPriority = 'normal' | 'high' | 'urgent' | '';

