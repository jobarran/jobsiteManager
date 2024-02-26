import { Company } from ".";

export interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    role: string[];
    image?: string[];
    ownedCompany?: Company;
    companyId: string
}

export interface StoreActiveCompanyUsers {
    id?: string;
    name: string;
    lastName: string;
    email: string;
}

export interface FetchUser {
    id?: string;
    name: string;
    lastName: string;
    role: UserRole;
}

export type UserRole = 'admin' | 'user'
