import { TaskPriority } from "@/interfaces";

export const handlePriorityTextColor = (priority: TaskPriority) => {
    switch (priority) {
        case 'normal':
            return 'text-lime-600'
        case 'high':
            return 'text-amber-600'
        case 'urgent':
            return 'text-red-600'
        default:
            break;
    }
}

export const handlePriorityBgColor = (priority: TaskPriority) => {
    switch (priority) {
        case 'normal':
            return 'bg-lime-100'
        case 'high':
            return 'bg-amber-100'
        case 'urgent':
            return 'bg-red-100'
        default:
            break;
    }
}