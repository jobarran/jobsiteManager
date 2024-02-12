import { Task } from '@/interfaces';
import { useState, useMemo } from 'react';

type ObjectType = {
    [key: string]: string | number;
};

const useQuickSearch = (
    initialData: (Task | ObjectType)[] | null,
): [ObjectType[], (searchValue: string) => void, () => void, (newData: (Task | ObjectType)[] | null) => void] => {
    const [data, setData] = useState<ObjectType[]>(() => {
        if (initialData) {
            const filteredData = initialData.filter(item => item !== null) as ObjectType[];
            return filteredData;
        }
        return [];
    });
    const [searchValue, setSearchValue] = useState<string>('');

    const filteredData = useMemo(() => {
        if (!data || !Array.isArray(data)) {
            return [];
        }

        return data.filter((item) => {
            const searchableProperties = Object.keys(item);
            return searchableProperties.some((property) =>
                String(item[property]).toLowerCase().includes(searchValue.toLowerCase())
            );
        });
    }, [data, searchValue]);

    const setSearch = (value: string) => {
        setSearchValue(value);
    };

    const clearSearch = () => {
        setSearch('');
    };

    const setNewData = (newData: (Task | ObjectType)[] | null) => {
        if (newData) {
            const filteredData = newData.filter(item => item !== null) as ObjectType[];
            setData(filteredData);
        } else {
            setData([]);
        }
    };

    return [filteredData, setSearch, clearSearch, setNewData];
};

const convertToObjectType = (item: Task | ObjectType): ObjectType | null => {
    if ('id' in item && typeof item.id !== 'undefined') {
        // Convert Task to ObjectType
        const objectType: ObjectType = {
            id: item.id,
            // Map other Task properties as needed
        };
        // You can add other properties here
        return objectType;
    } else if ('id' in item && typeof item.id === 'undefined') {
        // Handle undefined id or filter it out
        return null;
    }
    // Already ObjectType, no conversion needed
    return item as ObjectType;
};

export default useQuickSearch;
