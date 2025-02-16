import { useState, useEffect } from 'react';

export const useData = (initialData) => {
    const [renewData, setData] = useState(initialData);
    const [reloading, setReLoading] = useState(false);

    useEffect(() => {
        setReLoading(true);
        const timer = setTimeout(() => {
            setData(initialData);
            setReLoading(false);
        }, 1000);
        return () =>  clearTimeout(timer);
    }, [initialData]);

    return { renewData, setData, reloading };
}