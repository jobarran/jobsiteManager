'use client'

import React, { useEffect, useState } from 'react';
import { FaPercentage } from "react-icons/fa";

interface Props {
    progressValue: number,
    setProgressValue: (value:number)=> void,

}

export const RangeValue = ({progressValue, setProgressValue}: Props) => {


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(event.target.value);
        if (value < 0) {
            value = 0;
        } else if (value > 100) {
            value = 100;
        }
        setProgressValue(value);
    };

    return (
        <div className='pt-4'>
            <span className="text-lg text-gray-800 font-bold">Progress</span>
            <div className='flex items-center'>
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="any"
                    value={progressValue}
                    onChange={(event) => setProgressValue(parseInt(event.target.value))}
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
                <div className="relative ml-4">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <FaPercentage />
                    </div>
                    <input
                        type="text"
                        value={progressValue}
                        onChange={handleInputChange}
                        className="bg-white rounded-md border p-1 ps-8"
                        style={{ width: '80px', textAlign: 'center' }}
                        pattern="\d*"
                        title="Only numeric values are allowed"
                    />
                </div>

            </div>
        </div>
    );
};