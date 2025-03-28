import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const swaggerOptions = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'API para Clínica Veterinaria de Rehabilitación',
            description: 'Este proyecto es una aplicación desarrollada específicamente para una **veterinaria especializada en rehabilitación**. El objetivo principal de la app es migrar el modo de trabajo de la veterinaria hacia una plataforma digital, mejorando la eficiencia en la gestión y seguimiento de los tratamientos, pacientes y comunicación con los clientes.',
            contact: {
                name: 'Ricardo Graña',
                email: 'ricardogb.812@gmail.com',
                url: 'https://github.com/r1k4rd0g/Mascotapp,'
            },
            version: '1.00.0',
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    apis: [path.join(__dirname,'.src/docs/*/*yml')],
    tags: [
        {
            name: 'Countries',
            description: 'Endpoints para el manejo de países',
        }
    ]
}