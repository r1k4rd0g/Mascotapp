import { Table, Space, theme, Button, Switch, } from 'antd';
import { format } from 'date-fns';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { TableActionsMenu } from '../utils/tableActionsMenu';
import { Icons } from '../utils/icons';
import { useLoadingState } from '../../hooks/useLoadingState';
import { useData } from '../../hooks/useData';

export const GenericTable = ({
    data,
    onEdit,
    onDelete,
    onEditMultiple,
    selectedRowKeys,
    setSelectedRowKeys,
    entityConfig,
    parentData
}) => {
    const { token } = theme.useToken();
    const [ellipsis, setEllipsis] = useState(false);
    const { reloading } = useData(data);
    const { loadingStates, renderSpinner } = useLoadingState();
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            ellipsis
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name'
        },
        ...(entityConfig.showParent ? [{
            title: entityConfig.parentLabel,
            dataIndex: entityConfig.parentField,
            key: 'parent',
            render: (parentId) => {
                const parent = parentData?.find(p => p.id === parentId);
                return parent?.name || 'No asignado';
            }
        }] : []),
        {
            title: 'Activo',
            dataIndex: 'isActive',
            key: 'isActive',
            align: 'center',
            render: (isActive) => isActive ? 'Sí' : 'No'
        },
        {
            title: 'Fecha creación',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            render: (date) => format(new Date(date), 'dd/MM/yyyy')
        },
        {
            title: 'Acciones',
            key: 'actions',
            align: 'center',
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => onEdit(record)}
                        disabled={loadingStates.edit}
                        icon={loadingStates.edit ?  renderSpinner('edit') : <Icons name="EditTwoTone" />}
                    />
                    <Button
                        type="link"
                        onClick={() => onDelete(record.id)}
                        disabled={loadingStates.delete}
                        icon={loadingStates.delete ? renderSpinner('delete') : <Icons name="DeleteTwoTone" />}
                    />
                </Space>
            )
        }
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: setSelectedRowKeys,
        preserveSelectedRowKeys: true
    };

    return (
        <>
            <div style={{
                marginBottom: 16,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: token.colorBgContainer,
                padding: '8px 16px',
                borderRadius: token.borderRadiusLG
            }}>
                <Switch
                    checkedChildren="Modo compacto"
                    unCheckedChildren="Modo expandido"
                    checked={ellipsis}
                    onChange={setEllipsis}
                    style={{ marginLeft: 16 }}
                />
                <TableActionsMenu
                    onAdd={() => {/* Implementar según necesidad */ }}
                    onEditMultiple={selectedRowKeys.length > 0 ? onEditMultiple : undefined}
                    onDeleteMultiple={selectedRowKeys.length > 0 ? () => onDelete(selectedRowKeys) : undefined}
                    selectedKeys={selectedRowKeys}
                    entityName={entityConfig.label}
                />
            </div>
            {renderSpinner()} {/* Aquí se añade el spinner cuando se está cargando */}
            {!reloading && !loadingStates.edit && !loadingStates.delete && (
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    bordered
                    pagination={{ pageSize: 5 }}
                    rowSelection={rowSelection}
                    scroll={{ x: true }}
                    style={{
                        bodySortBg: token.bodySortBg,
                        borderColor: token.borderColor,
                        borderRadius: token.borderRadius,
                        colorText: token.colorText,
                        colorHeader: token.colorHeader,
                        headerBg: token.headerBg,
                        rowHoverBg: token.rowHoverBg,
                        rowSelectedBg: token.rowSelectedBg,
                    }}
                />
            )}
        </>
    )
};

GenericTable.propTypes = {
    data: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEditMultiple: PropTypes.func.isRequired,
    selectedRowKeys: PropTypes.array,
    setSelectedRowKeys: PropTypes.func.isRequired,
    entityConfig: PropTypes.object.isRequired,
    parentData: PropTypes.array
};
