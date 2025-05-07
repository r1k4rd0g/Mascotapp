import helmet from "helmet";
import config from "../configEnv.js";

const connectSrcUrls = ["'self'"];
if(config.connectSrcHelmet){
    connectSrcUrls.push(config.connectSrcHelmet);
}

export const helmetConfig = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"], //permite cargar por defecto solo recursos del mismo origen
            scriptSrc: ["'self'"], //permite utilizar los scripts del mismo dominio
            styleSrc: ["'self'"], //permite utilizar los estilos del mismo dominio
            imgSrc: ["'self'", "data:"], //permite imagenes del mismo dominio y data URIs
            fontSrc: ["'self'", "https://fonts.googleapis.com", "https://fonts.gstatic.com"], //permite fuentes del mismo dominio y de Google Fonts
            connectSrc: connectSrcUrls, //permite conexiones a los dominios especificados en connectSrcUrls
            frameAncestors: ["'none'"], //no permite que la pagina sea cargada en un iframe, frame, embed, object o applet
            formAction: ["'self'"], //permite que los formularios se envíen solo al mismo dominio
        },
    },
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }, //HSTS (HTTP Strict Transport Security) es un mecanismo de seguridad que protege a los sitios web contra ataques de intermediación de tráfico y re dirección. HSTS obliga a los navegadores a acceder a un sitio web solo a través de HTTPS, lo que significa que la comunicación entre el navegador y el servidor está cifrada y protegida contra ataques de intermediarios.
    frameguard: { action: 'DENY' }, //evita que la página sea cargada en un iframe, frame, embed, object o applet
    referrerPolicy: { policy: 'no-referrer' }, //evita que el navegador envíe la URL de la página de origen al servidor de destino al hacer una solicitud
})
