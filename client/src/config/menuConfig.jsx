//este archivo contiene la configuración de los menú headerComponent y sideBar.

import { CalendarOutlined, UserOutlined, HomeOutlined, SmileOutlined } from '@ant-design/icons'


export const topMenuItems = [
    { key: '1', label: 'Dashboard', icon: <HomeOutlined /> },
    { key: '2', label: 'Clientes', icon: <UserOutlined /> },
    { key: '3', label: 'Mascotas', icon: <SmileOutlined /> },
    { key: '4', label: 'Calendario', icon: <CalendarOutlined /> },
];

export const sideMenuItems = [
    {
        key: 'sub1',
        icon: <UserOutlined />,
        label: 'Clientes',
        children: [
            { key: '1', label: 'Agregar Cliente' },
            { key: '2', label: 'Listar Clientes' },
        ],
    },
    {
        key: 'sub2',
        icon: <SmileOutlined />,
        label: 'Mascotas',
        children: [
            { key: '3', label: 'Agregar Mascota' },
            { key: '4', label: 'Listar Mascotas' },
        ],
    },
    {
        key: 'sub3',
        icon: <CalendarOutlined />,
        label: 'Calendario',
        children: [
            { key: '5', label: 'Ver Citas' },
            { key: '6', label: 'Programar Cita' },
        ],
    },
];