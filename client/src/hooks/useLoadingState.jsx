import { useState, useRef } from "react";

export const useLoadingState = () => {
    const [loadingStates, setLoadingStates] = useState({}); //con objetivo vacío, permitirá utilizarlo en cualquier acción del código.
    const [percent, setPercent] = useState({}); //estado de progreso por acción
    const timeRef = useRef({}); //referencia a los tiempos de cada acción

    // 🟢 Inicia el estado de carga
    const startLoading = (action) => {
        setLoadingStates(prev => ({ ...prev, [action]: true }));
        setPercent(prev => ({ ...prev, [action]: 0 }));

        // Si el backend es rápido, stopLoading cancelará el intervalo antes de llegar a 100%.
        timeRef.current[action] = setInterval(() => {
            setPercent(prev => {
                const newPercent = Math.min((prev[action] || 0) + 20, 95);
                return { ...prev, [action]: newPercent };
            });
        }, 300);
    };

    // 🛑 Detiene el estado de carga cuando el backend responde
    const stopLoading = (action) => {
        clearInterval(timeRef.current[action]);
        delete timeRef.current[action];

        setLoadingStates(prev => ({ ...prev, [action]: false }));
        setPercent(prev => ({ ...prev, [action]: 100 })); // Fuerza a 100% inmediato
    };

    return { loadingStates, startLoading, stopLoading, percent };
};