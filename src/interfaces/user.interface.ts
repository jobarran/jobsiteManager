import { Company } from ".";

export interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    role: string[];
    image: string[];
    ownedCompany: Company;
    companyId: string
}

