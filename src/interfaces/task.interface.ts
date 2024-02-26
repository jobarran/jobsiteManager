import { FetchSubTask, SubTask } from ".";


export interface Task {
    id?:string
    name: string;
    location: string;
    description: string;
    incidence: string;
    contractor: string;
    progress: string;
    start: string;
    end: string;
    priority: TaskPriority;
    status: TaskStatus;
    projectId: string;
    subTasks: SubTask[]
}

export interface FetchTask {
    id: string;
    name: string;
    incidence: string;
    subTasks: FetchSubTask[];
}

export type TaskStatus = 'ongoing' | 'finished' | 'upcoming' | '';
export type TaskPriority = 'normal' | 'high' | 'urgent' | '';
