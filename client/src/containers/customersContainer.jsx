import { useEffect } from 'react';
import { TableClient } from '../components/table/clientTable';
import { useCrudOperations } from '../hooks/useCrudOperations';


export const CustomersContainer = () => {
    const {data, fetchData, editItem, deleteItem} = useCrudOperations('/customers');  // Aquí debes colocar tu endpoint real

    useEffect(() => {
        fetchData(); //carga datos al inicio
    }, [fetchData]);

    return <TableClient data={Array.isArray(data) ? data : []} onEdit={editItem} onDelete={deleteItem} />;
};

