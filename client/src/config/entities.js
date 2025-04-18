export const entitiesConfig = {
    country: {
        label: 'País',
        endpoint: '/api/countries',
        showParent: false,
        tableColumns: []
    },
    state: {
        label: 'Departamento',
        endpoint: '/api/states',
        showParent: true,
        parentEndpoint: '/api/countries',
        parentLabel: 'País',
        parentField: 'countryId',
        tableColumns: []
    },
    city: {
        label: 'Ciudad',
        endpoint: '/api/cities',
        showParent: true,
        parentEndpoint: '/api/states',
        parentLabel: 'Estado',
        parentField: 'stateId',
        customFields: {
            population: {
                type: 'number',
                label: 'Población',
                rules: [{ required: false, message: `El campo población es requerido}` }]
            }
        }
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
                title: 'Código Postal',
                dataIndex: 'postalCode',
                align: 'center'
            }
        ]
    }
};