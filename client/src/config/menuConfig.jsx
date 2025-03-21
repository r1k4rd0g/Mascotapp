//este archivo contiene la configuración de los menú headerComponent y sideBar.
import { Icons } from "../components/utils/icons";


export const topMenuItems = [
  { key: "1", label: "Dashboard", icon: <Icons name="HomeOutlined" />, link: "/dashboard" },
  { key: "2", label: "Process", icon: <Icons name="FieldTimeOutlined" />, link: "/clientes/listar" },
  { key: "3", label: "Mascotas", icon: <Icons name="BaiduOutlined" />, link: "/mascotas/listar" },
  { key: "4", label: "Ajustes", icon: <Icons name="SettingOutlined" />, link: "/ajustes" },
];

export const sideMenuItems = [
  {
    key: "sub1",
    icon: <Icons name="UserOutlined" />,
    label: "Clientes",
    items: [
      { key: "1", label: "Listar", link: "/clientes/listar" },
      { key: "2", label: "Agregar", link: "/clientes/agregar" },
    ],
  },
  {
    key: "sub2",
    icon: <Icons name="BaiduOutlined" />,
    label: "Mascotas",
    items: [
      { key: "3", label: "Listar", link: "/mascotas/listar" },
      { key: "4", label: "Agregar", link: "/mascotas/agregar" },
    ],
  },
  {
    key: "sub3",
    icon: <Icons name="CalendarOutlined" />,
    label: "Calendario",
    items: [
      { key: "5", label: "Programar Cita", link: "/calendario/agregar" },
      { key: "6", label: "Ver Citas del día", link: "/calendario" },
    ],
  },
  {
    key: "sub4",
    icon: <Icons name="EnvironmentOutlined" />,
    label: "Ubicaciones",
    link: "/user-profile",
    items: [
      { key: "7", label: "Paises", link: "/ubicaciones/paises" },
      { key: "8", label: "Departamento", link:"/ubicaciones/departamentos" },
      { key: "9", label: "Ciudades", link: "/ubicaciones/ciudades" },
      { key: "10", label: "Barrios", link: "/ubicaciones/barrios" },
    ]
  },
];

