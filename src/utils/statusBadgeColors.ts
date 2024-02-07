import { TaskStatus } from "@/interfaces";


export const handleStatusTextColor = (status:TaskStatus) => {
    switch (status) {
        case 'ongoing':
            return 'text-sky-700'
        case 'upcoming':
            return 'text-amber-600'
        case 'finished':
            return 'text-lime-600'
        default:
            break;
    }
}

export const handleStatusBgColor = (status:TaskStatus) => {
    switch (status) {
        case 'ongoing':
            return 'bg-sky-100'
        case 'upcoming':
            return 'bg-amber-100'
        case 'finished':
            return 'bg-lime-100'
        default:
            break;
    }
}

export const handleStatusBorderColor = (status:TaskStatus) => {
    switch (status) {
        case 'ongoing':
            return 'border-l-sky-700'
        case 'upcoming':
            return 'border-l-amber-600'
        case 'finished':
            return 'border-l-lime-600'
        default:
            break;
    }
}