import type { Project } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {

    activeProject: Project

    setProject: (project: State["activeProject"]) => void;
    unSetProject: () => void


}

export const useProjectStore = create<State>()(

    persist(
        (set, get) => ({
            activeProject: {
                id: '',
                name: '',
                description: '',
                status: '',
            },

            //Methods:
            setProject: (project) => {
                set({ activeProject: project });
            },

            unSetProject: () => {
                set({
                    activeProject: {
                        id: '',
                        name: '',
                        description: '',
                        status: '',
                    },
                })
            },

        }),
        {
            name: 'active-project',
            // skipHydration: true,
        }
    )
)