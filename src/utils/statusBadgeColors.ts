import { TaskStatus, Todo } from "@/interfaces";


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

const handleDateStatus = (date: string) => {
    const currentDate = new Date();
    const givenDate = new Date(date);

    // Set hours, minutes, seconds, and milliseconds to 0 for both dates to compare only dates
    currentDate.setHours(0, 0, 0, 0);
    givenDate.setHours(0, 0, 0, 0);

    // Calculate the start and end dates of the current week
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start of current week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6); // End of current week (Saturday)

    // Calculate the start date of the next week
    const startOfNextWeek = new Date(startOfWeek);
    startOfNextWeek.setDate(startOfNextWeek.getDate() + 7);

    if (givenDate.getTime() === currentDate.getTime()) {
        return "today";
    } else if (givenDate >= startOfWeek && givenDate <= endOfWeek) {
        return "this-week";
    } else if (givenDate >= startOfNextWeek && givenDate <= new Date(endOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000)) {
        return "next-week";
    } else {
        return "other";
    }
}

export const handleDateStatusTextColor = (Todo: Todo) => {
    if (Todo) {
        const dateStatus = handleDateStatus(Todo.date)
        switch (dateStatus) {
            case 'today':
                return 'text-lime-600'
            case 'this-week':
                return 'text-lime-600'
            case 'next-week':
                return 'text-amber-600'
            default:
                break;
        }
    }
}

export const handleDateStatusBgColor = (Todo: Todo) => {
    if (Todo) {
        const dateStatus = handleDateStatus(Todo.date)

        switch (dateStatus) {
            case 'today':
                return 'bg-lime-200'
            case 'this-week':
                return 'bg-lime-200'
            case 'next-week':
                return 'bg-amber-200'
            default:
        }
    }
}

export const handleDateStatusText = (Todo: Todo) => {
    if (Todo) {
        const dateStatus = handleDateStatus(Todo.date)

        switch (dateStatus) {
            case 'today':
                return 'Today'
            case 'this-week':
                return 'This week'
            case 'next-week':
                return 'Next week'
            default:
        }
    }
}