import type { activeCompany } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {

    activeCompany: activeCompany

    setCompany: (company: activeCompany) => void
    unSetCompany: () => void
    getActiveCompanyName: () => string


}

export const useCompanyStore = create<State>()(

    persist(
        (set, get) => ({
            activeCompany: {
                id: '',
                name: '',
                employeeFields: [],
                employeeRoles: [],
                userPossitions: [],
                companyLogo: '',
                users: [],
                projects: [],
            },

            //Methods:
            setCompany: (company: activeCompany) => {
                // Extract only the necessary fields from users and projects
                const users = (company?.users || []).map(user => ({ id: user.id, name: user.name, lastName: user.lastName }));
                const projects = (company?.projects || []).map(project => ({ id: project.id, name: project.name, status: project.status }));

                set((state) => ({
                    ...state,
                    activeCompany: {
                        id: company?.id || '',
                        name: company?.name || '',
                        employeeFields: company?.employeeFields || [],
                        employeeRoles: company?.employeeRoles || [],  
                        userPossitions: company?.userPossitions || [],
                        companyLogo: company?.companyLogo || '',
                        users: users || [],
                        projects: projects || [],
                    }
                }));
            },

            unSetCompany: () => {
                set({
                    activeCompany: {
                        id: '',
                        name: '',
                        employeeFields: [],
                        employeeRoles: [],
                        userPossitions: [],
                        companyLogo: '',
                        users: [],
                        projects: [],
                    },
                })
            },

            getActiveCompanyName: () => {
                return  get().activeCompany.name
            }
        }),
        {
            name: 'active-company',
            // skipHydration: true,
        }
    )

      
)