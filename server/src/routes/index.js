import { Router } from "express";
import swaggerUiExpress from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import {swaggerOptions} from '../docs/info.js';


class MainRouter {
    constructor() {
        this.router = Router();
        this.initRoutes();
    };
    initRoutes() {
        const specs = swaggerJsDoc(swaggerOptions);
        this.router.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
        //this.router.use()
    }

    getRouter(){
        return this.router;
    }
}

export const mainRouter = new MainRouter()