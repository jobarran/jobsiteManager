import { SubTask, Task } from '@/interfaces';
import { create } from 'zustand'


interface State {

    isSideMenuOpen: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;

    isTaskModalOpen: boolean;
    taskModalData: Task | null;
    taskModalType: ModalType | undefined
    openTaskModal: (task:Task | null, taskModalType: ModalType | undefined) => void;
    closeTaskModal: () => void;
    // updateTaskModalData: (task:Task) => void

    isSubTaskModalOpen: boolean;
    subTaskModalData: SubTask | null;
    subTaskModalType: ModalType | undefined
    openSubTaskModal: (subTask:SubTask | null, subTaskModalType:ModalType | undefined) => void;
    closeSubTaskModal: () => void;

}

enum ModalType {
    Edit = "edit",
    New = "new"
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
    // updateTaskModalData: (task) => set({taskModalData: task}),

    isSubTaskModalOpen: false,
    subTaskModalData: null,
    subTaskModalType: undefined,
    openSubTaskModal: (subTask, subTaskModalType) => set({ isSubTaskModalOpen: true, subTaskModalData: subTask, subTaskModalType: subTaskModalType }),
    closeSubTaskModal: () => set({ isSubTaskModalOpen: false, subTaskModalData: null, subTaskModalType: undefined }),

}))