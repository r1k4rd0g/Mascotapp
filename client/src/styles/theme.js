
export const themeConfig = {
    token: { //configuración genérica que aplica a todo el proyecto
        colorPrimary: '#EA3455FF',       // Color principal -->  //este lo está tomando en el navegador!!
        colorPrimaryText: '#4D4D4D',
        backgroundColor: '#F5E2E2FF',// Fondo de contenedores
        bodyBackground: '#9c9fa3',      // Fondo de la página
        colorBgHeader: '#F1C5ADFF',
        colorBgSidebar: '#F1C5ADFF',
        colorText: '#4D4D4D',           // Color del texto principal
        colorSuccess: '#73BFB8',        // Color de éxito
        colorWarning: '#ff9800',        // Color de advertencia
        colorError: '#f44336',          // Color de error
        borderRadius: 8,                // Radio de bordes
        colorBorder: '#BF7373FF',
        fontSizeBase: 16,               // Tamaño de fuente base

    },
    components: {
        Layout: {
            bodyBg: '#0C6CEBFF',
        },
        Menu: {
            colorText: '#404040',

        },
        Content: {
        },
        Form: {
        },
        Table: {
            bodySortBg: '#ECAEAEFF',
            borderColor: '#73BFB8',
            colorText: '#C44C4CFF',
            headerBg: '#F1C5ADFF',
            rowHoverBg: '#F8CDB6FF', //cuando paso por arriba de la fila, muestra en que fila estoy,
            rowSelectedBg: '#D4D70EFF', //cuando selecciono una fila, la resalta
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
