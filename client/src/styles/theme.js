
export const themeConfig = {
    token: { //configuración genérica que aplica a todo el proyecto
        colorPrimary: '#EA3455FF',       // Color principal -->  EA3455FF
        colorPrimaryText: '#020B23FF',
        backgroundColor: '#D8BBC2FF',// Fondo de contenedores
        bodyBackground: '#F3E6D5FF',      // Fondo de la página
        colorBgHeader: '#D8C4B6', // otro color posible 437B2BFF
        colorBgFooter: '#D8C4B6',
        colorBgSidebar: '#D8C4B6',
        colorBgContainer: '#F3E6D5FF', // Color de fondo de los contenedores
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
            backgroundColor: '#F3E6D5FF',

        },
        Content: {
            borderRadius: 8,
            backgroundColor: '#F3E6D5FF',
        },
        Form: {
        },
        Table: {
            bodySortBg: '#070700FF',
            borderColor: '#032617FF',
            colorText: '#4A0513FF',
            headerBg: '#4F709C',
            headerColor: '#F3E6D5FF',
            footerColor: '#F3E6D5FF',
            footerBg: '#4F709C',
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
