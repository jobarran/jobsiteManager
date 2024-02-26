import { FetchUser, User } from ".";
import { FetchTask, Task } from "./task.interface";


export interface Project {
    id: string;
    name: string;
    description?: string;
    status: ProjectStatus;
    shortName: string,
    location: string,
    end: string,
    tasks?: Task[],
    companyId?: string
    leader?: User[]
}

export interface StoreActiveCompanyProject {   
    id?: string;
    name: string;
}

export interface FetchProject {
    id: string;
    name: string;
    location: string | null;
    end: string | null;
    status: ProjectStatus;
    tasks: FetchTask[];
    leader?: FetchUser | null;
}

export type ProjectStatus = 'ongoing' | 'finished' | 'upcoming' | ''

