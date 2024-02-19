'use client'

import { TaskStatus } from "@/interfaces"
import { handleStatusBgColor, handleStatusTextColor } from "@/utils"
import { useEffect, useState } from "react";

interface Props {
    status: TaskStatus
}

export const StatusBadge = ({ status }: Props) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768); // Adjust the breakpoint as needed
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleStatusText = () => {
        switch (status) {
            case 'ongoing':
                return 'O';
            case 'upcoming':
                return 'U';
            case 'finished':
                return 'F';
            default:
                break;
        }
    }

    return (
        <span className={`${handleStatusTextColor(status)} ${handleStatusBgColor(status)} text-xs font-medium me-2 mx-2 px-2.5 py-0.5 rounded`}>
            {isSmallScreen ? handleStatusText() : status}
        </span>
    );
}