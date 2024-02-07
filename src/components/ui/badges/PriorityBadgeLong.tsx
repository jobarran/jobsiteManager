import { TaskPriority, TaskStatus } from "@/interfaces"
import { handlePriorityBgColor, handlePriorityTextColor } from "@/utils"

interface Props {
    priority: TaskPriority
}

export const PriorityBadgeLong = ({priority}:Props) => {


    return (

        <span className={`${handlePriorityTextColor(priority)} ${handlePriorityBgColor(priority)} text-xs font-medium px-2.5 py-0.5 rounded`}>
            {priority}
        </span>

    )
}
