// Modules
import express from 'express'
import { corsConfig } from './security/cors.js';
import { limiterConfig } from './security/limiter.js';
import { hppConfig } from './security/hpp.js';
import { helmetConfig } from './security/helmet.js'
import { mainRouter } from '../routes/index.js';
import { errorHandler } from '../middlewares/errorHandler.js';



// Variables
const app = express();


// Express setup
app.use(corsConfig);
app.use(limiterConfig);
app.use(hppConfig);
app.use(helmetConfig);
app.use(express.json());
app.disable('x-powered-by'); //deshabilita el encabezado x-powered-by para evitar que los atacantes sepan qué tecnología se está utilizando en el servidor
app.use(express.urlencoded({ extended: true })); //permite analizar los datos de formularios y las solicitudes de URL codificadas en la aplicación Express
app.use('/', mainRouter.getRouter());
app.use(errorHandler);

export default app
