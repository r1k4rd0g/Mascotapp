import { useState, useCallback } from 'react';
import axios from 'axios';

export const useCrudOperations = (baseUrl) => {
    const [data, setData] = useState([]);

    // Obtener datos
    const fetchData = useCallback(() => {
        axios.get(baseUrl)
            .then(response => setData(response.data))
            .catch(error => console.error("Error al obtener datos", error));
    }, [baseUrl]);

    // Editar un registro
    const editItem = (id, updatedItem) => {
        return axios.put(`${baseUrl}/${id}`, updatedItem)
            .then(() => {
                console.log("Registro actualizado");
                fetchData();  // Recargar datos
            })
            .catch(error => console.error("Error al actualizar", error));
    };

    // Eliminar un registro
    const deleteItem = (id) => {
        return axios.delete(`${baseUrl}/${id}`)
            .then(() => {
                console.log("Registro eliminado");
                setData(prevData => prevData.filter(item => item.id !== id));  // Actualiza sin recargar
            })
            .catch(error => console.error("Error al eliminar", error));
    };

    return { data, fetchData, editItem, deleteItem };
};
