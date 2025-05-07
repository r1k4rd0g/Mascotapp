import hpp from 'hpp';

export const hppConfig = hpp({
    whitelist: [
        'sort',
        'limit',
        'page',
        'fields',
        'populate',
        'select',
        'lean',
        'leanWithId',
        'projection',
        'projectionFields',
    ],
    // whitelist: [], // Array of query parameters to whitelist
})
