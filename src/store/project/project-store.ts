import type { Project, SubTask, Task } from "@/interfaces";
import { create } from "zustand";


interface State {

    activeProject: Project | null;
    activeProjectTasks: Task[] | null;
    setProject: (project: Project) => void;
    setProjectTasks: (tasks: Task[]) => void;
    unSetProject: () => void;

    activeTaskId: string;
    setActiveTaskId: (id:string) => void
    activeSubTaskId: string;
    setActiveSubTaskId: (id:string) => void

    isTaskModalOpen: boolean;
    taskModalData: Task | null;
    taskModalType: ModalType | undefined
    openTaskModal: (task: Task | null, taskModalType: ModalType | undefined) => void;
    closeTaskModal: () => void;

    isSubTaskModalOpen: boolean;
    subTaskModalData: SubTask | null;
    subTaskModalType: ModalType | undefined
    openSubTaskModal: (subTask: SubTask | null, subTaskModalType: ModalType | undefined) => void;
    closeSubTaskModal: () => void;

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
    setProjectTasks: (tasks) => set({ activeProjectTasks: tasks}),
    unSetProject: () => set({ activeProject: null, activeProjectTasks: null}),

    activeTaskId: '',
    activeSubTaskId: '',
    setActiveTaskId: (id) => set({activeTaskId: id}),
    setActiveSubTaskId: (id) => set({activeSubTaskId: id}),

    isTaskModalOpen: false,
    taskModalData: null,
    taskModalType: undefined,
    openTaskModal: (task, taskModalType) => set({ isTaskModalOpen: true, taskModalData: task, taskModalType: taskModalType }),
    closeTaskModal: () => set({ isTaskModalOpen: false, taskModalData: null, taskModalType: undefined }),

    isSubTaskModalOpen: false,
    subTaskModalData: null,
    subTaskModalType: undefined,
    openSubTaskModal: (subTask, subTaskModalType) => set({ isSubTaskModalOpen: true, subTaskModalData: subTask, subTaskModalType: subTaskModalType }),
    closeSubTaskModal: () => set({ isSubTaskModalOpen: false, subTaskModalData: null, subTaskModalType: undefined }),

    isIncidenceModalOpen: false,
    incidenceModalType: undefined,
    openIncidenceModal: (incidenceModalType) => set({ isIncidenceModalOpen: true, incidenceModalType: incidenceModalType }),
    closeIncidenceModal: () => set({ isIncidenceModalOpen: false, incidenceModalType: undefined})
  
}))