import { useState, useMemo } from 'react';

type ObjectType = {
    [key: string]: string | number; // Define the type of your objects here
};

const useQuickSearch = <T extends ObjectType>(
    initialData: T[],
): [T[], (searchValue: string) => void, () => void, (newData: T[]) => void] => {
    const [data, setData] = useState<T[] | null>(initialData);
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

    const setNewData = (newData: T[]) => {
        setData(newData);
    };

    return [filteredData, setSearch, clearSearch, setNewData];
};

export default useQuickSearch;