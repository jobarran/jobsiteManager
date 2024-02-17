'use client'

import { useProjectStore } from "@/store";
import { useEffect, useState } from "react";

interface Props {
    progressValue: number,
    setProgressValue: (value:number) => void,
}

export const ProjectSubTaskRangeValue = ({progressValue, setProgressValue}: Props) => {

    const setSubTaskModalEditableTrue = useProjectStore(state => state.setSubTaskModalEditableTrue)  

    const labelMargin = progressValue <= 4 ? '2px' : progressValue >= 96 ? 'calc(100% - 1.3rem - 1.25rem)' : `calc(${progressValue}% - 1.25rem)`;
    const labelStyle = {
        marginLeft: labelMargin,
        marginRight: labelMargin
    };

    const handleOnProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubTaskModalEditableTrue()
        setProgressValue(parseInt(event.target.value))
    }

    return (
        <div className='pt-4'>
            <h3 className="text-sm font-semibold text-gray-800">Progress</h3>

            <input
                type="range"
                min="0"
                max="100"
                step="any"
                value={progressValue}
                onChange={(event) => handleOnProgressChange(event)}
                className="
                    w-full h-full pt-2 appearance-none cursor-pointer bg-transparent z-30
                    [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:appearance-none
                    [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:appearance-none
                    [&::-ms-thumb]:bg-blue-600 [&::-ms-thumb]:rounded-full [&::-ms-thumb]:border-0 [&::-ms-thumb]:w-2.5 [&::-ms-thumb]:h-2.5 [&::-ms-thumb]:appearance-none
                    [&::-webkit-slider-runnable-track]:bg-neutral-200 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:overflow-hidden
                    [&::-moz-range-track]:bg-neutral-200 [&::-moz-range-track]:rounded-full
                    [&::-ms-track]:bg-neutral-200 [&::-ms-track]:rounded-full
                    [&::-moz-range-progress]:bg-blue-400 [&::-moz-range-progress]:rounded-full
                    [&::-ms-fill-lower]:bg-blue-400 [&::-ms-fill-lower]:rounded-full
                    [&::-webkit-slider-thumb]:shadow-[-999px_0px_0px_990px_#4e97ff]"
            />
            <div style={labelStyle} className="inline-block mt-1 py-0.5 px-1.5 bg-blue-50 border border-blue-200 text-xs font-medium text-blue-600 rounded-lg">
                {progressValue}%
            </div>
        </div>
    );
};