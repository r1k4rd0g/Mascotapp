import { useState, useCallback } from 'react';
import { baseUrl } from '../config/axiosConfig';

const API_BASE_URL = baseUrl;
export const useCrudOperations = (endpoint) => {
    const [data, setData] = useState([]);

    // Obtener datos
    const fetchData = useCallback(async () => {
        try {
            const response = await API_BASE_URL.get(endpoint)
            console.log("Datos obtenidos", response.data.detail);
            setData(response.data.detail)
        }
        catch (error) {
            console.error("Error al obtener datos", error)
        };
    }, [endpoint]);

    // Editar un registro
    const editItem = async (id, updatedItem) => {
        try {
            const response = await API_BASE_URL.put(`${endpoint}/${id}`, updatedItem)
            console.log("Registro actualizado", response.data.detail);
            setData(prevData =>
                prevData.map(item => item.id === id ? { ...item, ...updatedItem } : item)
            );
            return response.data;
        } catch (error) {
            console.error("Error al actualizar", error)
            throw error;
        }
    };

    // Eliminar un registro
    const deleteItem = async (id) => {
        return API_BASE_URL.delete(`${endpoint}/${id}`)
            .then(() => {
                console.log("Registro eliminado");
                setData(prevData => prevData.filter(item => item.id !== id));  // Actualiza sin recargar
            })
            .catch(error => console.error("Error al eliminar", error));
    };

    return { data, fetchData, editItem, deleteItem };
};
