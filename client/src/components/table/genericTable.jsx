//import { format } from 'date-fns';
//import { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Space, Button, Spin } from 'antd';
import { Icons } from '../utils/icons';
import { TableActionsMenu } from '../utils/tableActionsMenu';
import { useLoadingState } from '../../hooks/useLoadingState';
import { useData } from '../../hooks/useData';
import { TooltipGenerics } from '../utils/tooltipGenerics';
import { extendedThemeConfig } from '../../styles/theme';

export const GenericTable = ({
    data,
    columns: propColumns,
    onAdd,
    onEdit,
    onDelete,
    onEditMultiple,
    selectedRowKeys,
    setSelectedRowKeys,
    entityConfig,
    ellipsisSwitch,
    disableActions = false,
}) => {

    const { reloading } = useData(data);
    const { loadingStates, percent } = useLoadingState();

    const actionColumn = {
        title: 'Acciones',
        key: 'actions',
        align: 'center',
        render: (_, record) => (
            <Space>
                <TooltipGenerics title={disableActions ? "Acción inhabilitada" : "Editar"} placement='top'>
                    <Button
                        type="link"
                        onClick={() => onEdit?.(record)}
                        disabled={disableActions || loadingStates.edit}
                        icon={loadingStates.edit ? <Spin percent={percent.edit} size="small" /> : <Icons name="EditTwoTone" />}
                    />
                </TooltipGenerics>
                <TooltipGenerics title={disableActions ? "Acción inhabilitada" : "Editar"} placement='top'>
                    <Button
                        type="link"
                        onClick={() => onDelete?.(record.id)}
                        disabled={disableActions || loadingStates.delete}
                        icon={loadingStates.delete ? <Spin percent={percent.delete} size="small" /> : <Icons name="DeleteTwoTone" />}
                    />
                </TooltipGenerics>
            </Space>
        )
    }
    /*];
*/
    const columns = [...propColumns, actionColumn];
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
                marginBottom: "8px",
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: extendedThemeConfig.colorBgContainer,
                padding: '4px 4px',
                borderRadius: extendedThemeConfig.borderRadius,
                border: `1px solid ${extendedThemeConfig.borderColor}`,
            }}>
                {ellipsisSwitch}
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
                    bordered={true}
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
    columns: PropTypes.array.isRequired,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onEditMultiple: PropTypes.func,
    selectedRowKeys: PropTypes.array,
    setSelectedRowKeys: PropTypes.func.isRequired,
    entityConfig: PropTypes.object.isRequired,
    ellipsisSwitch: PropTypes.node,
    parentData: PropTypes.array,
    disableActions: PropTypes.bool,
};
