import { TaskStatus } from "@/interfaces";



export const statusBgColor = (status:TaskStatus) => {
    switch (status) {
        case 'ongoing':
            return 'bg-sky-700'
        case 'upcoming':
            return 'bg-amber-600'
        case 'finished':
            return 'bg-lime-600'
        default:
            break;
    }
}

