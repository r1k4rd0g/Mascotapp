import { useState, useCallback, useRef, useEffect } from 'react';
import { baseUrl } from '../config/axiosConfig';
import axios from 'axios';



export const useCrudOperations = (endpoint) => {
    const [data, setData] = useState([]);
    const activeRequests = useRef({})

    //limpia los CancelTokens al desmontar componentes
    useEffect(() => {
        return () => {
            Object.values(activeRequests.current).forEach(cancel => {
                cancel('cancelación de peticiones activas');
            });
            activeRequests.current = {};
        }
    }, []);
    //Creación y almacenamiento de CancelTokens
    const createCancelToken = (requestId) => {
        const source = axios.CancelToken.source();
        activeRequests.current[requestId] = source.cancel;
        return source.token;
    };
    //Eliminación de CancelTokens
    const removeCancelToken = (requestId) => {
        delete activeRequests.current[requestId];
    };

    // Obtener datos
    const getData = useCallback(async () => {
        const requestId = 'getData'; // ID único para la solicitud
        const cancelToken = createCancelToken(requestId); // Crear un nuevo CancelToken
        try {
            const response = await baseUrl.get(endpoint, { cancelToken })
            console.log("Datos obtenidos", response.data.detail);
            setData(response.data.detail)
        }
        catch (error) {
            if (axios.isCancel(error)) {
                console.log('Solicitud cancelada:', error.message);
            } else {
                console.error("Error al obtener datos", error)
            }
        } finally {
            removeCancelToken(requestId); // Eliminar el CancelToken después de la solicitud
        }
    }, [endpoint]);

    // Editar un registro
    const editItem = async (id, updatedItem) => {
        const requestId = `editItem-${id}`; // ID único para la solicitud
        const cancelToken = createCancelToken(requestId); // Crear un nuevo CancelToken
        try {
            const response = await baseUrl.put(`${endpoint}/${id}`, updatedItem, { cancelToken })
            console.log("Registro actualizado", response.data.detail);
            setData(prevData =>
                prevData.map(item => item.id === id ? { ...item, ...updatedItem } : item)
            );
            removeCancelToken(requestId); // Eliminar el CancelToken después de la solicitud
            return response.data;
        } catch (error) {
            if (axios.isCancel(error)) {
                throw error;
            } else if (error.response && error.response.data && error.response.data.message) {
                throw error; // Asegúrate de re-lanzar el error original
            } else {
                throw error;
            }
        } finally {
            removeCancelToken(requestId); // Eliminar el CancelToken después de la solicitud
        }
    };

    //Agregar un registro
    const addItem = async (newItem) => {
        const requestId = 'addItem'; // ID único para la solicitud
        const cancelToken = createCancelToken(requestId); // Crear un nuevo CancelToken
        try {
            const response = await baseUrl.post(endpoint, newItem, { cancelToken })
            console.log("Registro agregado", response.data.detail);
            setData(prevData => [...prevData, response.data.detail]);
            removeCancelToken(requestId); // Eliminar el CancelToken después de la solicitud
            return response.data;
        } catch (error) {
            if (axios.isCancel(error)) {
                throw error;
            }else if (error.response && error.response.data && error.response.data.message) {
                throw error // Lanza un error con el mensaje específico
            } else {
                console.error("Error al agregar", error)
                throw error;
            }
        } finally{
            removeCancelToken(requestId); // Eliminar el CancelToken después de la solicitud
        }
    };

    // Eliminar un registro
    const deleteItem = async (id) => {
        const requestId = `deleteItem-${id}`; // ID único para la solicitud
        const cancelToken = createCancelToken(requestId); // Crear un nuevo CancelToken
        try {
            const response = await baseUrl.delete(`${endpoint}/${id}`, { cancelToken })
            console.log("Registro eliminado", response.data.detail);
            setData(prevData => prevData.filter(item => item.id !== id));  // Actualiza sin recargar
            removeCancelToken(requestId); // Eliminar el CancelToken después de la solicitud
            return response.data;
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Solicitud cancelada:', error.message);
                throw error;
            } else {
                console.error("Error al eliminar", error)
                throw error;
            }
        } finally{
            removeCancelToken(requestId); // Eliminar el CancelToken después de la solicitud
        }
    };

    return { data, getData, editItem, deleteItem, addItem };
};
