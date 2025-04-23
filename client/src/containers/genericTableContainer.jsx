import { useEffect, useState, useMemo, useRef } from 'react';
import PropTypes from "prop-types"
import { Switch } from 'antd';
import { useCrudOperations } from '../hooks/useCrudOperations';
import { GenericTable } from '../components/table/genericTable';
import { EditModalDynamic } from '../components/modal/editModalDynamic';
import { MessageGenerics } from '../components/utils/messageGenerics';
import { AddModalDynamic } from '../components/modal/addModalDynamic';
import { useSearchGenerics } from '../hooks/useSearchGenerics';

export const GenericTableContainer = ({
    endpoint,
    entityConfig = {
        customFields: {},
        tableColumns: [],
    },
    parentData = null }) => {
    const { data:rawData, getData, addItem, editItem, deleteItem } = useCrudOperations(endpoint);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [modalKey, setModalKey] = useState(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [messageContent, setMessageContent] = useState(null);
    const [messageType, setMessageType] = useState(null);
    const [messageCounter, setMessageCounter] = useState(0);
    const [ellipsis, setEllipsis] = useState(true); //aparece modo compacto por default
    const [searchTextName, setSearchTextName] = useState('');
    const [searchedColumnName, setSearchedColumnName] = useState('');
    const searchInputName = useRef(null);
    const [searchTextParent, setSearchTextParent] = useState('');
    const [searchedColumnParent, setSearchedColumnParent] = useState('');
    const searchInputParent = useRef(null);

    const data = useMemo(() => {
        if (rawData && rawData.length > 0 && Object.hasOwn(rawData[0], 'id')) {
            return [...rawData].sort((a, b) => b.id - a.id);
        }
        return rawData; // Devolvemos la data sin ordenar si no hay 'id' o está vacía
    }, [rawData]);

    const getNameSearchProps = useSearchGenerics(
        'name',
        searchTextName,
        setSearchedColumnName,
        { setSearchText: setSearchTextName },
        searchInputName,
        searchedColumnName,
    );
    const parentSearchProps = useSearchGenerics(
        entityConfig.parentField,
        searchTextParent,
        setSearchedColumnParent,
        setSearchTextParent,
        searchInputParent,
        searchedColumnParent,
        parentData,
        entityConfig,
    );

    useEffect(() => {
        getData(); //carga datos al inicio desde el useCrudOperations
    }, [getData]);

    const updatedColumns = useMemo(() => (entityConfig.tableColumns || []).map(col => {
        let updatedCol = { ...col, ellipsis: ellipsis };
        if (col.dataIndex === 'name') {
            updatedCol = { ...updatedCol, ...getNameSearchProps };
        }
        if (col.dataIndex === entityConfig.parentField) {
            updatedCol = {
                ...updatedCol,
                title: entityConfig.parentLabel,
                ...parentSearchProps, // Aplicamos TODAS las searchProps del hook
                render: (text) => { // <---- Nuestro render AHORA ENVUELVE el render del hook
                    const parent = parentData?.find(p => p.id === text);
                    const parentName = parent?.name || 'No asignado';

                    // Si la columna actual es la que se está buscando,
                    // DEVOLVEMOS el render del hook (que incluye el Highlighter)
                    if (searchedColumnParent === entityConfig.parentField) {
                        return parentSearchProps.render(parentName); // <---- Usamos el render del hook
                    }
                    return parentName; // Si no se está buscando, mostramos el nombre directamente
                },
            };
        }
        return updatedCol;
    }), [entityConfig.tableColumns, ellipsis, entityConfig.parentField, entityConfig.parentLabel, parentData, searchedColumnParent, getNameSearchProps, parentSearchProps]); // Omitimos parentSearchProps de las dependencias

    let finalColumns = [...updatedColumns];
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

    const handleSaveCompleted = async (shouldAddAnother) => {
        await getData();
        setEditModalVisible(false);
        setSelectedRowKeys([]);
        setModalData([]);
        if (!shouldAddAnother) {
            setAddModalVisible(false);
        }
    }

    const handleClose = async (content, type) => {
        setEditModalVisible(false);
        setAddModalVisible(false);
        setSelectedRowKeys([]);
        setModalData([]);
        if (content) { //proporciona el mensaje si el modal da error
            setMessageContent({ message: content, counter: messageCounter });
            setMessageType(type);
            setMessageCounter(prevCounter => prevCounter + 1);;
        }
    };

    return (
        <>
            <MessageGenerics messageContent={messageContent} type={messageType} />
            <GenericTable
                data={data}
                columns={finalColumns}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={deleteItem} //falta configurar
                onEditMultiple={handleEditMultiple}
                selectedRowKeys={selectedRowKeys}
                setSelectedRowKeys={setSelectedRowKeys}
                entityConfig={entityConfig}
                parentData={parentData}
                ellipsisSwitch={
                    <Switch
                        checkedChildren={ellipsis ? "Modo compacto" : "Modo expandido"} // Cambia la etiqueta del switch
                        unCheckedChildren={ellipsis ? "Modo compacto" : "Modo expandido"} // Cambia la etiqueta del switch
                        checked={ellipsis}
                        onChange={setEllipsis}
                        style={{ marginLeft: 16 }}
                    />
                }
            />
            <EditModalDynamic
                key={modalKey}
                visible={editModalVisible}
                onClose={handleClose}
                onSaveCompleted={handleSaveCompleted}
                initialData={modalData[0] || {}}
                modalData={modalData}
                isMultiple={modalData.length > 1}
                totalItems={modalData.length}
                entityConfig={entityConfig}
                parentData={parentData}
                editItem={editItem}
                messageCounter={messageCounter}
            />
            <AddModalDynamic
                key={modalKey + 1000}
                visible={addModalVisible}
                onClose={handleClose}
                onSaveCompleted={handleSaveCompleted}
                entityConfig={entityConfig}
                parentData={parentData}
                addItem={addItem}
                messageCounter={messageCounter}
            />
        </>
    );
};

// Validación completa de PropTypes
GenericTableContainer.propTypes = {
    endpoint: PropTypes.string.isRequired,
    entityConfig: PropTypes.shape({
        label: PropTypes.string.isRequired,
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
