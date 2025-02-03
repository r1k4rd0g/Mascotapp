import { useEffect } from 'react';
import {TableComponent} from '../components/table/tableClient';
import { useCrudOperations } from '../hooks/useCrudOperations';


export const CustomersContainer = () => {
    const [data, fetchData, editItem, deleteItem] = useCrudOperations('/api/customers');  // Aquí debes colocar tu endpoint real

    useEffect(() => {
        fetchData(); //carga datos al inicio
    }, [fetchData]);

    return <TableComponent data={data} onEdit={editItem} onDelete={deleteItem} />;
};

