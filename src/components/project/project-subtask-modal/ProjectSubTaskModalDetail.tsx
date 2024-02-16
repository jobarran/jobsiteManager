'use client'

import { ProjectSubTaskModalHeader, RangeValue } from "@/components";
import { useEffect, useState } from "react";

export const ProjectSubTaskModalDetail = () => {

    const [isEditable, setIsEditable] = useState(false);
    const [progressValue, setProgressValue] = useState(50);
    const [progressChange, setProgressChange] = useState(false);

    useEffect(() => {
        if (progressChange !== true ) {
            setProgressChange(true);
            console.log('true')
        }
        console.log(progressChange)
    }, [progressValue]);

    const handleIsEditable = () => {
        setIsEditable(true);
    };

    return (
        <div>
            <div className="flex items-start justify-between py-4 border-b rounded-t dark:border-gray-600">
                <ProjectSubTaskModalHeader
                    handleIsEditable={handleIsEditable}
                    progressChange={progressChange}
                    setProgressChange={setProgressChange}
                />
            </div>
            <RangeValue
                progressValue={progressValue}
                setProgressValue={setProgressValue}
            />
        </div>
    );
};