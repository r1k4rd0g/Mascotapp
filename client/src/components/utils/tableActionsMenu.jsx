import PropTypes from 'prop-types';
import { Menu, Dropdown, Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { Icons } from '../utils/icons'; // Ajusta la ruta según tu estructura

export const TableActionsMenu = ({
    onAdd,
    onEdit,
    onDelete,
    selectedKeys,
    addLabel = 'Agregar',
    editLabel = 'Editar selección',
    deleteLabel = 'Eliminar selección',
    addIcon = 'PlusCircleTwoTone',
    editIcon = 'EditTwoTone',
    deleteIcon = 'DeleteTwoTone',
    extraMenuItems = []
}) => {
    const menu = (
        <Menu>
            <Menu.Item key="add" onClick={onAdd}>
                <Icons name={addIcon} /> {addLabel}
            </Menu.Item>

            {selectedKeys?.length > 0 && [
                <Menu.Item key="edit" onClick={() => onEdit(selectedKeys)}>
                    <Icons name={editIcon} /> {editLabel}
                </Menu.Item>,
                <Menu.Item key="delete" onClick={() => onDelete(selectedKeys)}>
                    <Icons name={deleteIcon} /> {deleteLabel}
                </Menu.Item>
            ]}

            {extraMenuItems.map((item, index) => (
                <Menu.Item key={`extra-${index}`} {...item.props}>
                    {item.content}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <Button type="text" icon={<EllipsisOutlined />} />
        </Dropdown>
    );
};

TableActionsMenu.propTypes = {
    onAdd: PropTypes.func.isRequired,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    selectedKeys: PropTypes.array,
    addLabel: PropTypes.string,
    editLabel: PropTypes.string,
    deleteLabel: PropTypes.string,
    addIcon: PropTypes.string,
    editIcon: PropTypes.string,
    deleteIcon: PropTypes.string,
    extraMenuItems: PropTypes.arrayOf(
        PropTypes.shape({
            props: PropTypes.object,
            content: PropTypes.node
        })
    )
};