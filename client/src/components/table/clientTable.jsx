import { Table, Tag, Space } from 'antd';
import PropTypes from "prop-types";
import { Icons } from '../utils/icons';

const { Column, ColumnGroup } = Table;

export const TableClient = ({ data, onEdit, onDelete }) => {
    return (
        <Table dataSource={data} rowKey="id">
            <ColumnGroup title="Nombre Completo">
                <Column title="Nombre" dataIndex="firstName" key="firstName" />
                <Column title="Apellido" dataIndex="lastName" key="lastName" />
            </ColumnGroup>
            <Column title="Edad" dataIndex="age" key="age" />
            <Column title="Dirección" dataIndex="address" key="address" />
            <Column
                title="Etiquetas"
                dataIndex="tags"
                key="tags"
                render={(tags) => (
                    <>
                        {tags.map((tag) => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';
                            if (tag === 'loser') color = 'volcano';
                            return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
                        })}
                    </>
                )}
            />
            <Column
                title="Acciones"
                key="action"
                render={(_ignored, record) => (
                    <Space size="middle">
                        <a onClick={() => onEdit(record)}>
                            <Icons name="EditTwoTone" />
                        </a>
                        <a onClick={() => onDelete(record)}>
                            <Icons name="DeleteTwoTone"/>
                            </a>
                    </Space>
                )}
            />
        </Table>
    );
};

TableClient.propTypes = {
    data: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}
