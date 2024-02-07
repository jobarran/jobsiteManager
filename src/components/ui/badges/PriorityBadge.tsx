import { TaskPriority, TaskStatus } from "@/interfaces"
import { handlePriorityBgColor, handlePriorityTextColor } from "@/utils"

interface Props {
    priority: TaskPriority
}

export const PriorityBadge = ({priority}:Props) => {


    const handlePriorityText = () => {
        switch (priority) {
            case 'normal':
                return 'N'
            case 'high':
                return 'H'
            case 'urgent':
                return 'U'
            default:
                break;
        }
    }

    return (

        <span className={`${handlePriorityTextColor(priority)} ${handlePriorityBgColor(priority)} text-xs font-medium me-2 px-2.5 py-0.5 rounded`}>
            {handlePriorityText()}
        </span>

    )
}
