import { useEffect, useState } from 'react';
import PropTypes from "prop-types"
import { useCrudOperations } from '../hooks/useCrudOperations';
import { GenericTable } from '../components/table/genericTable';
import { DynamicEditModal } from '../components/modal/dynamicEditModal';

export const GenericTableContainer = ({ endpoint, entityConfig }) => {
    const { data, fetchData, editItem, deleteItem } = useCrudOperations(endpoint);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalKey, setModalKey] = useState(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [parentData, setParentData] = useState(null);

    // Cargar datos principales y relacionados
    useEffect(() => {
        const loadData = async () => {
            await fetchData();
            if (entityConfig.parentEndpoint) {
                const parentResponse = await fetch(entityConfig.parentEndpoint);
                const parentData = await parentResponse.json();
                setParentData(parentData);
            }
        };
        loadData();
    }, [fetchData, entityConfig.parentEndpoint]);

    // Sincronizar datos seleccionados
    useEffect(() => {
        if (selectedRowKeys?.length > 0 && data) {
            const rows = selectedRowKeys.map(key =>
                data.find(item => item.id === key))
                .filter(Boolean);
            setModalData(rows);
        } else {
            setModalData([]);
        }
    }, [selectedRowKeys, data]);

    // Handlers comunes
    const handleEdit = (item) => {
        setModalData([item]);
        setIsModalVisible(true);
        setModalKey(prev => prev + 1);
    };

    const handleEditMultiple = () => {
        if (!selectedRowKeys?.length) return;
        const rows = data.filter(item => selectedRowKeys.includes(item.id));
        setModalData(rows);
        setIsModalVisible(true);
        setModalKey(prev => prev + 1);
    };

    const handleSave = async (updatedData) => {
        try {
            await editItem(updatedData.id, updatedData);
            await fetchData();
            setIsModalVisible(false);
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedRowKeys([]);
        setModalData([]);
    };

    return (
        <>
            <GenericTable
                data={data}
                onEdit={handleEdit}
                onDelete={deleteItem}
                onEditMultiple={handleEditMultiple}
                selectedRowKeys={selectedRowKeys}
                setSelectedRowKeys={setSelectedRowKeys}
                entityConfig={entityConfig}
                parentData={parentData}
            />
            <DynamicEditModal
                key={modalKey}
                visible={isModalVisible}
                onCancel={handleCancel}
                onSave={handleSave}
                entityConfig={entityConfig}
                initialData={modalData[0] || {}}
                modalData={modalData}
                parentData={parentData}
            />
        </>
    );
};

// Validación completa de PropTypes
GenericTableContainer.propTypes = {
    endpoint: PropTypes.string.isRequired,
    entityConfig: PropTypes.shape({
        label: PropTypes.string.isRequired,
        showParent: PropTypes.bool,
        parentEndpoint: function (props, propName, componentName) {
            if (props.entityConfig?.showParent && !props.entityConfig[propName]) {
                return new Error(
                    `Propiedad '${propName}' es requerida cuando showParent es true en ${componentName}`
                );
            }
        },
        parentLabel: function (props, propName, componentName) {
            if (props.entityConfig?.showParent && !props.entityConfig[propName]) {
                return new Error(
                    `Propiedad '${propName}' es requerida cuando showParent es true en ${componentName}`
                );
            }
        },
        parentField: function (props, propName, componentName) {
            if (props.entityConfig?.showParent && !props.entityConfig[propName]) {
                return new Error(
                    `Propiedad '${propName}' es requerida cuando showParent es true en ${componentName}`
                );
            }
        },
        customFields: PropTypes.objectOf(
            PropTypes.shape({
                type: PropTypes.oneOf(['text', 'number', 'select', 'switch']).isRequired,
                label: PropTypes.string,
                options: PropTypes.array,
                rules: PropTypes.array
            })
        ),
        tableColumns: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string.isRequired,
                dataIndex: PropTypes.string.isRequired,
                render: PropTypes.func,
                align: PropTypes.oneOf(['left', 'center', 'right']),
                width: PropTypes.number,
                fixed: PropTypes.oneOf(['left', 'right', true, false])
            })
        )
    }).isRequired
};

// Valor por defecto para customFields
GenericTableContainer.defaultProps = {
    entityConfig: {
        customFields: {},
        tableColumns: []
    }
};
