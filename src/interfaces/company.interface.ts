import { ProjectStatus } from "@prisma/client";
import { Project, User } from ".";



export interface Company {
    id: string;
    name: string;
    employeeFields: string[];
    employeeRoles: string[];
    userPossitions: string[];
    projects: Project[];
    users: User[];
    companyLogo?: string
}

export interface activeCompany {
    id: string;
    name: string;
    employeeFields: string[];
    employeeRoles: string[];
    userPossitions: string[];
    companyLogo: string;
    users: {
        id: string,
        name: string,
        lastName: string
    }[];
    projects: {
        id: string,
        name: string,
        status: ProjectStatus
    }[];
};