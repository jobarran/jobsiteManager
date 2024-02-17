import type { Project, SubTask, Task } from "@/interfaces";
import { create } from "zustand";


interface State {

    activeProject: Project | null;
    activeProjectTasks: Task[] | null;
    setProject: (project: Project) => void;
    setProjectTasks: (tasks: Task[]) => void;
    unSetProject: () => void;

    activeTaskId: string;
    setActiveTaskId: (id: string) => void
    activeSubTaskId: string;
    setActiveSubTaskId: (id: string) => void

    isTaskModalOpen: boolean;
    taskModalType: ModalType | undefined
    openTaskModal: (taskModalType: ModalType | undefined) => void;
    closeTaskModal: () => void;

    isSubTaskModalOpen: boolean;
    subTaskModalType: ModalType | undefined
    isSubTaskModalEdited: boolean;
    openSubTaskModal: (subTaskModalType: ModalType | undefined) => void;
    closeSubTaskModal: () => void;
    setSubTaskModalEditableTrue: () => void;
    setSubTaskModalEditableFalse: () => void;

    isIncidenceModalOpen: boolean;
    incidenceModalType: IncidenceModalType | undefined
    openIncidenceModal: (incidenceModalType: IncidenceModalType | undefined) => void;
    closeIncidenceModal: () => void;

}

enum ModalType {
    Edit = "edit",
    New = "new"
}

enum IncidenceModalType {
    Task = "task",
    Subtask = "subtask"
}

export const useProjectStore = create<State>()((set) => ({

    activeProject: null,
    activeProjectTasks: null,
    setProject: (project) => set({ activeProject: project }),
    setProjectTasks: (tasks) => set({ activeProjectTasks: tasks }),
    unSetProject: () => set({ activeProject: null, activeProjectTasks: null, activeTaskId: '', activeSubTaskId: '', }),

    activeTaskId: '',
    activeSubTaskId: '',
    setActiveTaskId: (id) => set({ activeTaskId: id }),
    setActiveSubTaskId: (id) => set({ activeSubTaskId: id }),

    isTaskModalOpen: false,
    taskModalType: undefined,
    openTaskModal: (taskModalType) => set({ isTaskModalOpen: true, taskModalType: taskModalType }),
    closeTaskModal: () => set({ isTaskModalOpen: false, taskModalType: undefined, activeTaskId: '', activeSubTaskId: '' }),

    isSubTaskModalOpen: false,
    subTaskModalData: null,
    subTaskModalType: undefined,
    isSubTaskModalEdited: false,
    openSubTaskModal: (subTaskModalType) => set({ isSubTaskModalOpen: true, subTaskModalType: subTaskModalType, isSubTaskModalEdited: false }),
    closeSubTaskModal: () => set({ isSubTaskModalOpen: false, subTaskModalType: undefined, activeSubTaskId: '', isSubTaskModalEdited:false }),
    setSubTaskModalEditableTrue: () => set({ isSubTaskModalEdited: true }),
    setSubTaskModalEditableFalse: () => set({ isSubTaskModalEdited: false }),

    isIncidenceModalOpen: false,
    incidenceModalType: undefined,
    openIncidenceModal: (incidenceModalType) => set({ isIncidenceModalOpen: true, incidenceModalType: incidenceModalType }),
    closeIncidenceModal: () => set({ isIncidenceModalOpen: false, incidenceModalType: undefined })

}))