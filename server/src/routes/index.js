import { Router } from "express";
import swaggerUiExpress from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import {swaggerOptions} from '../docs/info.js';
<<<<<<< HEAD
import countriesRouter from './countriesRouter.js';
import statesRouter from './statesRouter.js';
import citiesRouter from './citiesRouter.js';
import neighborhoodsRouter from './neighborhoodsRouter.js';
=======

>>>>>>> 2a099d6139b39928a394870e1264031cdaa87479


class MainRouter {
    constructor() {
        this.router = Router();
        this.initRoutes();
    };
    initRoutes() {
        const specs = swaggerJsDoc(swaggerOptions);
        this.router.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
<<<<<<< HEAD
        this.router.use('/api/countries', countriesRouter);
        this.router.use('/api/states', statesRouter);
        this.router.use('/api/cities', citiesRouter);
        this.router.use('/api/neighborhoods', neighborhoodsRouter);

=======
        //this.router.use()
>>>>>>> 2a099d6139b39928a394870e1264031cdaa87479
    }

    getRouter(){
        return this.router;
    }
}

export const mainRouter = new MainRouter()