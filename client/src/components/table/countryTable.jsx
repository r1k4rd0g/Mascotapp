import { format } from 'date-fns';
import PropTypes from "prop-types";
import { useState } from 'react';
import { Table, Space, theme, Switch, Spin, Button } from 'antd';
import { Icons } from '../utils/icons';
import { TableActionsMenu } from '../utils/tableActionsMenu';
import { useLoadingState } from '../../hooks/useLoadingState';
import { useData } from '../../hooks/useData';




export const CountryTable = ({ data, onEdit, onDelete, onAdd, onEditMultiple, selectedRowKeys, setSelectedRowKeys }) => {
    const { token } = theme.useToken();
    const [ellipsis, setEllipsis] = useState(false);
    const { loadingStates, percent } = useLoadingState();
    const { reloading } = useData(data);

    const rowSelection = {
        selectedRowKeys,
        onChange: setSelectedRowKeys,
        preserveSelectedRowKeys: true,
    }
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            ellipsis,
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            ellipsis,
        },
        {
            title: 'Activo',
            dataIndex: 'isActive',
            key: 'isActive',
            align: 'center',
            render: (isActive) => (isActive ? 'Sí' : 'No'),
            ellipsis,
        },
        {
            title: 'Fecha creación',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            render: (createdAt) => format(new Date(createdAt), 'dd/MM/yyyy'),
            ellipsis,
        },
        {
            title: 'Acciones',
            key: 'action',
            align: 'center',
            render: (_ignored, record) => (
                <Space size="middle">
                    <Button
                        type="link"
                        onClick={() => onEdit(record)}
                        disabled={loadingStates.edit}
                        icon={loadingStates.edit ? <Spin percent={percent.edit} size="small" /> : <Icons name="EditTwoTone" />}
                    />
                    <Button
                        type="link"
                        onClick={() => onDelete(record)}
                        disabled={loadingStates.delete}
                        icon={loadingStates.delete ? <Spin percent={percent.delete} size="small" /> : <Icons name="DeleteTwoTone" />}
                    />
                </Space>
            ),
        }
    ]
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
                    onAdd={onAdd}
                    onEdit={() => onEdit(selectedRowKeys)}
                    onEditMultiple={onEditMultiple}
                    onDelete={() => onDelete(selectedRowKeys)}
                    selectedKeys={selectedRowKeys}
                />
            </div>
            {reloading ? (
                <Spin tip="Cargando datos..." size="large" style={{ display: 'block', textAlign: 'center', marginTop: 50 }} />
            ) : (
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    bordered
                    pagination={{ pageSize: 5 }}
                    rowSelection={rowSelection}
                    footer={() => 'Fin de tabla'}
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

CountryTable.propTypes = {
    data: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onEditMultiple: PropTypes.func.isRequired,
    selectedRowKeys: PropTypes.array,
    setSelectedRowKeys: PropTypes.func.isRequired,
}
