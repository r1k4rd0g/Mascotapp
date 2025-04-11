
export const themeConfig = {
    token: { //configuración genérica que aplica a todo el proyecto
        colorPrimary: '#EA3455FF',       // Color principal -->  EA3455FF
        colorPrimaryText: '#020B23FF',
        backgroundColor: '#D8BBC2FF',// Fondo de contenedores
        bodyBackground: '#9c9fa3',      // Fondo de la página
        colorBgHeader: '#E6E49AFF',
        colorBgFooter: '#E6E49AFF',
        colorBgSidebar: '#D9F1B1FF',
        colorBgContainer: '#E3E3CCFF', // Color de fondo de los contenedores
        borderColor: '#EA3455ff',
        colorText: '#020B23FF',           // Color del texto principal
        colorSuccess: '#B8DC6B',        // Color de éxito
        colorWarning: '#ff9800',        // Color de advertencia
        colorError: '#f44336',          // Color de error
        borderRadius: 8,                // Radio de bordes
        colorBorder: '##EA3455FF',
        fontSizeBase: 16,               // Tamaño de fuente base

    },
    components: {
        Layout: {
            bodyBg: '#02234EFF',
        },
        Menu: {
            colorText: '#020B23FF',
            backgroundColor: '#E3E3CCFF',

        },
        Content: {
            borderRadius: 8,
            backgroundColor: '#E3E3CCFF',
        },
        Form: {
        },
        Table: {
            bodySortBg: '#070700FF',
            borderColor: '#032617FF',
            colorText: '#7a1026',
            headerBg: '#D9F1B1FF',
            headerColor: '#070700FF',
            footerColor: '#070700FF',
            footerBg: '#D9F1B1FF',
            rowHoverBg: '#D6D392FF', //cuando paso por arriba de la fila, muestra en que fila estoy,
            rowSelectedBg: '#D6D392FF', //cuando selecciono una fila, la resalta
            borderRadius: 8,
        },
    }
};

// Fusionamos los tokens globales con los de los componentes
export const extendedThemeConfig = {
    ...themeConfig.token,
    ...themeConfig.components.Layout,
    ...themeConfig.components.Menu,
    ...themeConfig.components.Content,
    ...themeConfig.components.Form,
    ...themeConfig.components.Table,
};
