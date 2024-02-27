import { Project, User } from ".";

export interface Company {
    id: string;
    name: string;
    employeeFields?: string[];
    employeeRoles?: string[];
    userPossitions?: string[];
    projects?: Project[];
    users?: User[];
    companyLogo?: string
}

export interface StoreActiveCompany {
    id?: string;
    name?: string;
}
