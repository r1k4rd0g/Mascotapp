// Modules
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { mainRouter } from '../routes/index.js';
import { errorHandler } from '../middlewares/errorHandler.js';



// Variables
const app = express();


// Express setup
app.use(cors());
app.use(helmet());
app.use(express.json());
app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));
app.use('/', mainRouter.getRouter());
app.use(errorHandler);

export default app