

export interface Project {
    id: string;
    name: string;
    description: string;
    status: ProjectStatus;
}

export type ProjectStatus = 'ongoing' | 'finished' | 'upcoming' | '';