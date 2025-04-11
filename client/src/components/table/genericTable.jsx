import { format } from 'date-fns';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Space, Button, Switch, Spin } from 'antd';
import { Icons } from '../utils/icons';
import { TableActionsMenu } from '../utils/tableActionsMenu';
import { useLoadingState } from '../../hooks/useLoadingState';
import { useData } from '../../hooks/useData';
import { useSearchGenerics } from '../utils/searchGenerics';
import { TooltipGenerics } from '../utils/tooltipGenerics';
import {extendedThemeConfig} from '../../styles/theme';

export const GenericTable = ({
    data,
    onAdd,
    onEdit,
    onDelete,
    onEditMultiple,
    selectedRowKeys,
    setSelectedRowKeys,
    entityConfig,
    parentData
}) => {

    const [ellipsis, setEllipsis] = useState(false); //aparece modo expandido por default
    const { reloading } = useData(data);
    const { loadingStates, percent } = useLoadingState();
    const nameSearchProps = useSearchGenerics('name');
    const columns = [
        {
            title: 'Id', dataIndex: 'id', key: 'id', align: 'right', ellipsis
        },
        {
            title: 'Nombre', dataIndex: 'name', key: 'name', ellipsis,
            ...nameSearchProps
        },
        ...(entityConfig.showParent ? [{
            title: entityConfig.parentLabel, dataIndex: entityConfig.parentField, key: 'parent', ellipsis,
            render: (parentId) => {
                const parent = parentData?.find(p => p.id === parentId);
                return parent?.name || 'No asignado';
            }
        }] : []),
        {
            title: 'Activo', dataIndex: 'isActive', key: 'isActive', align: 'center', ellipsis,
            render: (isActive) => isActive ? 'Sí' : 'No'
        },
        {
            title: 'Fecha creación', dataIndex: 'createdAt', key: 'createdAt', align: 'center', ellipsis,
            render: (date) => format(new Date(date), 'dd/MM/yyyy')
        },
        {
            title: 'Acciones',
            key: 'actions',
            align: 'center',
            render: (_, record) => (
                <Space>
                    <TooltipGenerics title= "Editar" placement='top'>
                        <Button
                            type="link"
                            onClick={() => onEdit(record)}
                            disabled={loadingStates.edit}
                            icon={loadingStates.edit ? <Spin percent={percent.edit} size="small" /> : <Icons name="EditTwoTone" />}
                        />
                    </TooltipGenerics>
                    <TooltipGenerics title= "Eliminar" placement='top'>
                    <Button
                        type="link"
                        onClick={() => onDelete(record.id)}
                        disabled={loadingStates.delete}
                        icon={loadingStates.delete ? <Spin percent={percent.delete} size="small" /> : <Icons name="DeleteTwoTone" />}
                    />
                    </TooltipGenerics>
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
        <div style={{
            textAlign: "center",
            borderRadius: extendedThemeConfig.borderRadius,
        }}>
            <div style={{
                marginBottom: 16,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: extendedThemeConfig.colorBgContainer,
                padding: '8px 16px',
                borderRadius: extendedThemeConfig.borderRadius,
                border: `1px solid ${extendedThemeConfig.borderColor}`,
            }}>
                <Switch
                    checkedChildren={ellipsis ? "Modo compacto" : "Modo expandido"} // Cambia la etiqueta del switch
                    unCheckedChildren={ellipsis ? "Modo compacto" : "Modo expandido"} // Cambia la etiqueta del switch
                    checked={ellipsis}
                    onChange={setEllipsis}
                    style={{ marginLeft: 16 }}
                />
                <TableActionsMenu
                    onAdd={onAdd}
                    onEditMultiple={selectedRowKeys.length > 0 ? onEditMultiple : undefined}
                    onDeleteMultiple={selectedRowKeys.length > 0 ? () => onDelete(selectedRowKeys) : undefined}
                    selectedKeys={selectedRowKeys}
                    entityName={entityConfig.label}
                />
            </div>
            {reloading ? (
                <Spin size="large" style={{ display: 'block', textAlign: 'center', marginTop: 50 }} />
            ) : (
                <Table
                style={{
                    rowsColor: extendedThemeConfig.rowsColor,
                    borderColor: extendedThemeConfig.borderColor,
                    borderRadius: extendedThemeConfig.borderRadius,
                    colorText: extendedThemeConfig.colorText,
                    colorHeader: extendedThemeConfig.headerColor,
                    headerBg: extendedThemeConfig.headerBg,
                    rowHoverBg: extendedThemeConfig.rowHoverBg,
                    rowSelectedBg: extendedThemeConfig.rowSelectedBg,
                }}
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    bordered = {true}
                    pagination={{
                        showSizeChanger: true,
                        position: ['bottomCenter'],
                        pageSizeOptions: ['10', '20', '50', '100'],
                        showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} registros`
                    }}
                    rowSelection={rowSelection}
                    footer={() => '--- * Pie de Tabla * ---'}
                />
            )}
        </div>
    )
};

GenericTable.propTypes = {
    data: PropTypes.array.isRequired,
    onAdd: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEditMultiple: PropTypes.func.isRequired,
    selectedRowKeys: PropTypes.array,
    setSelectedRowKeys: PropTypes.func.isRequired,
    entityConfig: PropTypes.object.isRequired,
    parentData: PropTypes.array
};
