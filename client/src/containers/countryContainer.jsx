import { useEffect, useState } from 'react';
import { CountryTable } from '../components/table/countryTable';
import { useCrudOperations } from '../hooks/useCrudOperations';
import { EditCountryModal } from '../components/modal/editionModal';



export const CountryContainer = () => {
    const { data, fetchData, editItem, deleteItem } = useCrudOperations('api/countries/');  // Aquí debes colocar tu endpoint real
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalKey, setModalKey] = useState(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [modalData, setModalData] = useState([]);


    useEffect(() => {
        fetchData(); //carga datos al inicio desde el useCrudOperations
    }, [fetchData]);

    useEffect(() => {
        // Este useEffect se encarga de sincronizar modalData con selectedRowKeys
        if (selectedRowKeys && selectedRowKeys.length > 0 && data) { // Añadido data
            const rows = selectedRowKeys.map(key => data.find(item => item.id === key)).filter(row => row !== undefined);
            setModalData(rows);
        } else {
            setModalData([]);
        }
    }, [selectedRowKeys, data]); // Añadido data como dependencia

    const handleEdit = (selectedCountry) => {
        setModalData([selectedCountry]);
        setIsModalVisible(true);
        setModalKey(prevKey => prevKey + 1);
    };

    const handleSave = async (updatedData) => {
        try {
            await editItem(updatedData.id, updatedData);
            fetchData();
            setIsModalVisible(false);
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    };

    const handleEditMultiple = () => {
        if (!selectedRowKeys || selectedRowKeys.length === 0) return;
        const rows = data.filter(item => selectedRowKeys.includes(item.id));
        setModalData(rows);
        setIsModalVisible(true);
        setModalKey(prev => prev + 1);
    };

    const handleSaveMultiple = async (updatedData) => {
        try {
            await editItem(updatedData.id, updatedData);
            await fetchData(); // Refresca los datos
            // Actualiza modalData manteniendo los IDs seleccionados
            setModalData(prev =>
                prev.slice(1).filter(item => selectedRowKeys.includes(item.id))
            );
        } catch (error) {
            console.error('Error al guardar:', error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedRowKeys([]);
        setModalData([]);
    };


    return (
        <>
            <CountryTable
                data={data}
                onEdit={handleEdit}
                onDelete={deleteItem}
                onEditMultiple={handleEditMultiple}
                selectedRowKeys={selectedRowKeys}
                setSelectedRowKeys={setSelectedRowKeys}
            />
            <EditCountryModal
                key={modalKey}
                visible={isModalVisible}
                onCancel={handleCancel}
                onSave={handleSave}
                onSaveMultiple={handleSaveMultiple}
                initialData={modalData[0] || {}} // Para compatibilidad con edición simple
                modalData={modalData} // <--- ¡Prop crítico que faltaba!
                isMultiple={modalData.length > 1}
                totalItems={modalData.length}
            />
        </>
    )
};

