import { useState, useCallback } from 'react';
import { baseUrl } from '../config/axiosConfig';


export const useCrudOperations = (endpoint) => {
    const [data, setData] = useState([]);

    // Obtener datos
    const getData = useCallback(async () => {
        try {
            const response = await baseUrl.get(endpoint)
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
            const response = await baseUrl.put(`${endpoint}/${id}`, updatedItem)
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

    //Agregar un registro
    const addItem = async (newItem) => {
        try {
            const response = await baseUrl.post(endpoint, newItem)
            console.log("Registro agregado", response.data.detail);
            setData(prevData => [...prevData, response.data.detail]);
            return response.data;
        } catch (error) {
            console.error("Error al agregar", error)
            throw error;
        }
    };

    // Eliminar un registro
    const deleteItem = async (id) => {
        return baseUrl.delete(`${endpoint}/${id}`)
            .then(() => {
                console.log("Registro eliminado");
                setData(prevData => prevData.filter(item => item.id !== id));  // Actualiza sin recargar
            })
            .catch(error => console.error("Error al eliminar", error));
    };

    return { data, getData, editItem, deleteItem, addItem };
};
