import { useEffect, useState } from 'react';
import PropTypes from "prop-types"
import { useCrudOperations } from '../hooks/useCrudOperations';
import { GenericTable } from '../components/table/genericTable';
import { EditModalDynamic } from '../components/modal/editModalDynamic';
import { MessageGenerics } from '../components/utils/messageGenerics';
import { AddModalDynamic } from '../components/modal/addModalDynamic';



export const GenericTableContainer = ({ endpoint, entityConfig, parentData }) => {
    const { data, getData, addItem, editItem, deleteItem } = useCrudOperations(endpoint);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [modalKey, setModalKey] = useState(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [messageContent, setMessageContent] = useState(null);
    const [messageType, setMessageType ] = useState(null);
    const [messageCounter, setMessageCounter] = useState(0);



    useEffect(() => {
        getData(); //carga datos al inicio desde el useCrudOperations
    }, [getData]);


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
        setEditModalVisible(true);
        setModalKey(prev => prev + 1);
    };

    const handleEditMultiple = () => {
        if (!selectedRowKeys?.length) return;
        const rows = data.filter(item => selectedRowKeys.includes(item.id));
        setModalData(rows);
        setEditModalVisible(true);
        setModalKey(prev => prev + 1);
    };

    const handleAdd = () => {
        setModalData([{}]);
        setAddModalVisible(true);
        setModalKey(prev => prev + 1);
    }

    const handleSaveCompleted = async (content, type) => {
        await getData();
        setEditModalVisible(false);
        setAddModalVisible(false);
        setSelectedRowKeys([]);
        setModalData([]);
        setMessageContent({message: content, counter: messageCounter});
        setMessageType(type);
        setMessageCounter(prevCounter => prevCounter + 1);
    }

    const handleCancel = async (content, type) => {
        setEditModalVisible(false);
        setAddModalVisible(false);
        setSelectedRowKeys([]);
        setModalData([]);
        setMessageContent({message: content, counter: messageCounter});
        setMessageType(type);
        setMessageCounter(prevCounter => prevCounter + 1);
        await getData();
    };

    return (
        <>
            <MessageGenerics messageContent={messageContent} type={messageType} />
            <GenericTable
                data={data}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={deleteItem} //falta configurar
                onEditMultiple={handleEditMultiple}
                selectedRowKeys={selectedRowKeys}
                setSelectedRowKeys={setSelectedRowKeys}
                entityConfig={entityConfig}
                parentData={parentData}
            />
            <EditModalDynamic
                key={modalKey}
                visible={editModalVisible}
                onCancel={handleCancel}
                onSaveCompleted={handleSaveCompleted}
                initialData={modalData[0] || {}}
                modalData={modalData}
                isMultiple={modalData.length > 1}
                totalItems={modalData.length}
                entityConfig={entityConfig}
                parentData={parentData}
                editItem={editItem}
            />
            <AddModalDynamic
                key={modalKey +1000}
                visible={addModalVisible}
                onCancel={handleCancel}
                onSaveCompleted={handleSaveCompleted}
                entityConfig={entityConfig}
                parentData={parentData}
                addItem={addItem}
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
    }).isRequired,
    parentData: PropTypes.array
};

// Valor por defecto para customFields
GenericTableContainer.defaultProps = {
    entityConfig: {
        customFields: {},
        tableColumns: []
    },
    parentData: null
};
