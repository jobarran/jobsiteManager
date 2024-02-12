'use client'

import { ProjectSubTaskModalHeader } from "@/components";
import { useState } from "react";




export const ProjectSubTaskModalDetail = () => {

    const [isEditable, setIsEditable] = useState(false)

    const handleIsEditable = () => {
        setIsEditable(true)
    }

    return (

        <div className="flex items-start justify-between py-4 border-b rounded-t dark:border-gray-600">
           <ProjectSubTaskModalHeader
            handleIsEditable={handleIsEditable} />
        </div>

    );
};

