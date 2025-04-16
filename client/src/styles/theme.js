
export const themeConfig = {
    token: { //configuración genérica que aplica a todo el proyecto
        colorPrimary: '#EA3455FF',       // Color principal -->  EA3455FF
        colorPrimaryText: '#020B23FF',
        backgroundColor: '#E0E0E0',// Fondo de contenedores
        bodyBackground: '#E0E0E0',      // Fondo de la página
        colorBgHeader: '#767272FF', // otro color posible 437B2BFF
        colorBgFooter: '#767272FF',
        colorBgSidebar: '#767272FF',
        colorBgContainer: '#E0E0E0', // Color de fondo de los contenedores
        borderColor: '#999999 ',
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
            backgroundColor: '#E0E0E0',

        },
        Content: {
            borderRadius: 8,
            backgroundColor: '#E0E0E0',
        },
        Form: {
        },
        Table: {
            bodySortBg: '#070700FF',
            borderColor: '#767272FF ',
            colorText: '#020B23FF',
            headerBg: '#4F709C',
            headerColor: '#F5EFE7',
            footerColor: '#F5EFE7',
            footerBg: '#4F709C',
            rowHoverBg: '#F580AFFF', //cuando paso por arriba de la fila, muestra en que fila estoy,
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
