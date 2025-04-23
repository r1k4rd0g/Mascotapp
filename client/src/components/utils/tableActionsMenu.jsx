import PropTypes from 'prop-types';
import { Button, Dropdown, Space } from 'antd';
import { TooltipGenerics } from './tooltipGenerics';
import { Icons } from '../utils/icons'; // Ajusta la ruta según tu estructura

export const TableActionsMenu = ({
    onAdd,
    onEditMultiple,
    onDelete,
    selectedKeys,
    editLabel = 'Editar selección',
    deleteLabel = 'Eliminar selección',
    extraMenuItems = []
}) => {
    const menuItems = [];
    if (selectedKeys?.length > 0) {
        menuItems.push({
            key: 'edit',
            label: (
                <TooltipGenerics title={editLabel} placement="left">
                    <span>
                        <Icons name={'EditTwoTone'} />
                    </span>
                </TooltipGenerics>
            ),
            onClick: () => onEditMultiple(selectedKeys),
        });
        menuItems.push({
            key: 'delete',
            label: (
                <TooltipGenerics title={deleteLabel} placement="left">
                    <span>
                        <Icons name={'DeleteTwoTone'} />
                    </span>
                </TooltipGenerics>
            ),
            onClick: () => onDelete(selectedKeys),
        });
    }
    extraMenuItems.forEach((item, index) => {
        menuItems.push({
            key: `extra-${index}`,
            label: (
                <TooltipGenerics title={item.props?.tooltipTitle || ''} placement="left">
                    {item.content}
                </TooltipGenerics>
            ),
            onClick: item.props?.onClick,
            ...item.props, // Pass other props if needed
        });
    });
    return (
        <Space>
            <TooltipGenerics title="Agregar" placement='top'>
                <Button type="text" onClick={onAdd}
                    icon={<Icons name={'PlusCircleTwoTone'} />}
                />
            </TooltipGenerics>
            <Dropdown menu={{ items: menuItems }} trigger={['click']}>
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
