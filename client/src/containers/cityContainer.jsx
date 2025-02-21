// containers/CityContainer.jsx
import { useState, useEffect } from 'react';
import { GenericTableContainer } from '../components/GenericTableContainer';
import { useCrudOperations } from '../hooks/useCrudOperations';
import { DynamicEditModal } from '../components/modal/dynamicEditModal';
import PropTypes from "prop-types";

export const CityContainer = ({ states }) => {
    const [loadingStates, setLoadingStates] = useState(true);
    const { fetchData } = useCrudOperations('api/states'); // Hook para obtener estados

    // Opcional: Si los estados no vienen por props
    useEffect(() => {
        const loadParentData = async () => {
            const data = await fetchData();
            // setStates(data); // Si usas estado interno
        };
        if (!states) loadParentData();
    }, []);

    const columns = [
        { title: 'Nombre', dataIndex: 'name' },
        {
            title: 'Estado',
            dataIndex: 'state_id',
            render: (id) => states?.find(s => s.id === id)?.name || 'Cargando...'
        },
        {
            title: 'Activo',
            dataIndex: 'isActive',
            render: (val) => val ? 'Sí' : 'No'
        }
    ];

    return (
        <GenericTableContainer
            entityName="City"
            apiEndpoint="api/cities"
            columns={columns}
            parentData={states} // Si viene por props
        >
            {(props) => (
                <DynamicEditModal
                    {...props}
                    parentData={states || []} // Pasa a ambos casos
                />
            )}
        </GenericTableContainer>
    );
};

CityContainer.propTypes = {
    states: PropTypes.array // Opcional si se cargan internamente
};