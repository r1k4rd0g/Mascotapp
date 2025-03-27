import PropTypes from 'prop-types';
import { Button, Dropdown, Menu, Space } from 'antd';
import { TooltipGenerics } from './tooltipGenerics';
import { Icons } from '../utils/icons'; // Ajusta la ruta según tu estructura

export const TableActionsMenu = ({
    onAdd,
    onEditMultiple,
    onDelete,
    selectedKeys,
    addLabel = 'Agregar',
    editLabel = 'Editar selección',
    deleteLabel = 'Eliminar selección',
    extraMenuItems = []
}) => {
    const menu = (
        <Menu>
            {selectedKeys?.length > 0 && [
                <Menu.Item key="edit" onClick={() => onEditMultiple(selectedKeys)}>
                    <Icons name={'EditTwoTone'} /> {editLabel}
                </Menu.Item>,
                <Menu.Item key="delete" onClick={() => onDelete(selectedKeys)}>
                    <Icons name={'DeleteTwoTone'} /> {deleteLabel}
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
        <Space>
            <TooltipGenerics title="Agregar" placement='top'>
            <Button type="text" onClick={onAdd} addLabel={addLabel}
                icon={<Icons name={'PlusCircleTwoTone'} />}
            />
            </TooltipGenerics>
            <Dropdown overlay={menu} trigger={['click']}>
                <TooltipGenerics title="Más opciones al seleccionar items" placement='top'>
                    <Button type="text" icon={<Icons name={'EllipsisOutlined'} />} />
                </TooltipGenerics>
            </Dropdown>
        </Space>
    );
};

TableActionsMenu.propTypes = {
    onAdd: PropTypes.func.isRequired,
    onEditMultiple: PropTypes.func,
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