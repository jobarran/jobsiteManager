import { FaRegStar } from 'react-icons/fa6';
import { FaRegSquare } from 'react-icons/fa';


export const TodoSkeleton = (
    <>
        <div className="flex items-center justify-between pt-4 animate-pulse">
            <div className="flex items-center space-x-2">
                <FaRegStar className="text-gray-200" />
                <FaRegSquare className="text-gray-200" />
                <div className="flex-shrink">
                    <div className="h-3 w-56 rounded-full bg-gray-200"></div>
                    <span className="block h-1 w-full"></span>
                    <div className="h-3 w-44 rounded-full bg-gray-200"></div>
                    <span className="block h-1 w-full"></span>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-between pt-4 animate-pulse">
            <div className="flex items-center space-x-2">
                <FaRegStar className="text-gray-200" />
                <FaRegSquare className="text-gray-200" />
                <div className="flex-shrink">
                    <div className="h-3 w-56 rounded-full bg-gray-200"></div>
                    <span className="block h-1 w-full"></span>
                    <div className="h-3 w-44 rounded-full bg-gray-200"></div>
                    <span className="block h-1 w-full"></span>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-between pt-4 animate-pulse">
            <div className="flex items-center space-x-2">
                <FaRegStar className="text-gray-200" />
                <FaRegSquare className="text-gray-200" />
                <div className="flex-shrink">
                    <div className="h-3 w-56 rounded-full bg-gray-200"></div>
                    <span className="block h-1 w-full"></span>
                    <div className="h-3 w-44 rounded-full bg-gray-200"></div>
                    <span className="block h-1 w-full"></span>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-between pt-4 animate-pulse">
            <div className="flex items-center space-x-2">
                <FaRegStar className="text-gray-200" />
                <FaRegSquare className="text-gray-200" />
                <div className="flex-shrink">
                    <div className="h-3 w-56 rounded-full bg-gray-200"></div>
                    <span className="block h-1 w-full"></span>
                    <div className="h-3 w-44 rounded-full bg-gray-200"></div>
                    <span className="block h-1 w-full"></span>
                </div>
            </div>
        </div>

    </>
);