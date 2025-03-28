import { Router } from "express";
import swaggerUiExpress from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import {swaggerOptions} from '../docs/info.js';
import countriesRouter from './countriesRouter.js';
import statesRouter from './statesRouter.js';
import citiesRouter from './citiesRouter.js';
import neighborhoodsRouter from './neighborhoodsRouter.js';


class MainRouter {
    constructor() {
        this.router = Router();
        this.initRoutes();
    };
    initRoutes() {
        const specs = swaggerJsDoc(swaggerOptions);
        this.router.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
        this.router.use('/api/countries', countriesRouter);
        this.router.use('/api/states', statesRouter);
        this.router.use('/api/cities', citiesRouter);
        this.router.use('/api/neighborhoods', neighborhoodsRouter);

    }

    getRouter(){
        return this.router;
    }
}

export const mainRouter = new MainRouter()