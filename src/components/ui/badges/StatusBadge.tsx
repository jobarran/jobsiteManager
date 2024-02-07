import { TaskStatus } from "@/interfaces"
import { handleStatusBgColor, handleStatusTextColor } from "@/utils"

interface Props {
    status: TaskStatus
}

export const StatusBadge = ({status}:Props) => {

    return (

        <span className={`${handleStatusTextColor(status)} ${handleStatusBgColor(status)} text-xs font-medium me-2 mx-2 px-2.5 py-0.5 rounded`}>
            {status}
        </span>

    )
}
