import format from 'date-fns/format';

export const entitiesConfig = {
    country: {
        label: 'País',
        endpoint: '/api/countries',
        showParent: false,
        tableColumns: [
            {
                title: "Id", dataIndex: "id", key: "id", align: "right"
            },
            {
                title: "Nombre", dataIndex: "name", key: "name", align: "center", ellipsis: true
            },
            {
                title: 'Activo', dataIndex: 'isActive', key: 'isActive', align: "center", render: (isActive) => isActive ? 'Sí' : 'No'
            },
            {
                title: 'Fecha creación', dataIndex: 'createdAt', key: 'createdAt', align: 'center',
                render: (date) => format(new Date(date), 'dd/MM/yyyy')
            },
        ]
    },
    state: {
        label: 'Departamento',
        endpoint: '/api/states',
        showParent: true,
        parentEndpoint: '/api/countries',
        parentLabel: 'País',
        parentField: 'countryId',
        tableColumns: [
            {
                title: "Id", dataIndex: "id", key: "id", align: "right"
            },
            {
                title: "Nombre", dataIndex: "name", key: "name", ellipsis: true
            },
            {
                title: 'País', dataIndex: 'countryId', key: 'countryId', align: 'center'
            },
            {
                title: 'Activo', dataIndex: 'isActive', key: 'isActive', align: 'center', render: (isActive) => isActive ? 'Sí' : 'No'
            },
            {
                title: 'Fecha creación', dataIndex: 'createdAt', key: 'createdAt', align: 'center',
                render: (date) => format(new Date(date), 'dd/MM/yyyy')
            },
        ]
    },
    city: {
        label: 'Ciudad',
        endpoint: '/api/cities',
        showParent: true,
        parentEndpoint: '/api/states',
        parentLabel: 'Estado',
        parentField: 'stateId',
        tableColumns: [
            {
                title: "Id", dataIndex: "id", key: "id", align: "right",
            },
            {
                title: "Nombre", dataIndex: "name", key: "name", ellipsis: true
            },
            {
                title: 'Departamento', dataIndex: 'stateId', key: 'stateId', align: 'center'
            },
            {
                title: 'Activo', dataIndex: 'isActive', key: 'isActive', render: (isActive) => isActive ? 'Sí' : 'No'
            },
            {
                title: 'Fecha creación', dataIndex: 'createdAt', key: 'createdAt', align: 'center',
                render: (date) => format(new Date(date), 'dd/MM/yyyy')
            },
        ]
    },
    neighborhood: {
        label: 'Barrio',
        endpoint: '/api/neighborhoods',
        showParent: true,
        parentEndpoint: '/api/cities',
        parentLabel: 'Ciudad',
        parentField: 'cityId',
        tableColumns: [
            {
                title: "Id", dataIndex: "id", key: "id", align: "right",
            },
            {
                title: "Nombre", dataIndex: "name", key: "name", ellipsis: true
            },
            {
                title: 'Ciudad', dataIndex: 'cityId', key: 'cityId', align: 'center'
            },
            {
                title: 'Activo', dataIndex: 'isActive', key: 'isActive', render: (isActive) => isActive ? 'Sí' : 'No'
            },
            {
                title: 'Fecha creación', dataIndex: 'createdAt', key: 'createdAt', align: 'center',
                render: (date) => format(new Date(date), 'dd/MM/yyyy')
            },
        ]
    }
};
