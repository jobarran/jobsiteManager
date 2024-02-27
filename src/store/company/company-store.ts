import type { StoreActiveCompany, StoreActiveCompanyProject, StoreActiveCompanyUsers } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {

    activeCompany: StoreActiveCompany | null | undefined
    activeCompanyProjects: StoreActiveCompanyProject[] | null
    activeCompanyUsers: StoreActiveCompanyUsers[] | null
    setActiveCompany: (company: StoreActiveCompany) => void
    setActiveCompanyProjects: (projects: StoreActiveCompanyProject[]) => void
    setActiveCompanyUsers: (projects: StoreActiveCompanyUsers[]) => void
    unSetActiveCompany: () => void
    unSetActiveCompanyProjects: () => void
    unSetActiveCompanyUsers: () => void
}

export const useCompanyStore = create<State>()(

    persist(
        (set, get) => ({

            activeCompany: null,
            activeCompanyProjects: null,
            activeCompanyUsers: null,
            //Methods:
            setActiveCompany: (company) => set({ activeCompany: company }),
            setActiveCompanyProjects: (projects) => set({ activeCompanyProjects: projects }),
            setActiveCompanyUsers: (users) => set({ activeCompanyProjects: users }),
            unSetActiveCompany: () => set({ activeCompany: null, activeCompanyProjects: null, activeCompanyUsers: null}),
            unSetActiveCompanyProjects: () => set({ activeCompanyProjects: null }),
            unSetActiveCompanyUsers: () => set({ activeCompanyUsers: null }),
        }),

        {
            name: 'active-company',
            // skipHydration: true,
        }
    )

)