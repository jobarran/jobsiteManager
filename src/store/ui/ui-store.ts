import { SubTask, Task } from '@/interfaces';
import { create } from 'zustand'


interface State {

    isSideMenuOpen: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;

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


export const useUIStore = create<State>()((set) => ({

    isSideMenuOpen: false,
    openSideMenu: () => set({ isSideMenuOpen: true }),
    closeSideMenu: () => set({ isSideMenuOpen: false }),

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