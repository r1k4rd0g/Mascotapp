// Modules
import { Router } from "express";
import swaggerUiExpress from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import {swaggerOptions} from '../docs/info.js';
import countriesRouter from './countriesRouter.js';



class MainRouter {
    constructor() {
        this.router = Router();
        this.initRoutes();
    };
    initRoutes() {
        const specs = swaggerJsDoc(swaggerOptions);
        this.router.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
        this.router.use('/api/countries', countriesRouter);
        //this.router.use()
    }

    getRouter(){
        return this.router;
    }
}

export const mainRouter = new MainRouter()