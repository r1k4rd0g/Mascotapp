import { useMemo } from 'react'
import {Typography } from 'antd'
import {format} from 'date-fns'
import { useMessageHistory } from '../hooks/useMessageHistory'
import { GenericTable } from './table/genericTable'

const { Text } = Typography

export const MessageHistory = () => {
    const { history } = useMessageHistory();

    const formattedHistory = useMemo(() => {
        return history.map((item, index) => ({
            key: index.toString(),
            content: item.content,
            type: item.type,
            timestamp: item.timestamp,
            id: index, // Asumiendo un ID temporal basado en el índice para este ejemplo
        })).sort((a, b) => b.id - a.id); // Ordena por id descendente
    }, [history]);
    const historyEntityConfig = {
        label: 'Historial de Mensajes',
    }
    const historyColumns=[
        {
            title: 'Mensaje',
            dataIndex: 'content',
            key: 'content',
            align: 'left',
            ellipsis: true,
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            render: (type) => <Text type={type}>{type}</Text>,
        },
        {
            title: 'Fecha/Hora',
            dataIndex: 'timestamp',
            key: 'timestamp',
            align: 'center',
            render: (timestamp) => {
                const dateObject = new Date(timestamp);
                return format(dateObject, 'dd/MM/yyyy HH:mm:ss');
            },
        },
    ]
    return (
        <div>
            <Typography.Title level={4}>Historial de Mensajes</Typography.Title>
            <Text type="secondary" style={{ marginBottom: '10px', display: 'block' }}>Tabla meramente informativa. Se muestran los últimos 100 mensajes del sistema, se eliminan al borrar el historial de navegación.</Text>
            <GenericTable
                data={formattedHistory}
                columns={historyColumns}
                entityConfig={historyEntityConfig}
                onAdd={() => {}}
                onEdit={() => {}}
                onDelete={() => {}}
                onEditMultiple={() => {}}
                selectedRowKeys={[]}
                setSelectedRowKeys={() => {}}
                disableActions={true}
            />
        </div>
    )
}
