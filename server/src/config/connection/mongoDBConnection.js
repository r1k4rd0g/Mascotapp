//Modules
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import config from "../configEnv.js";
import logger from "../../utils/logger/loggerWinston.js";

class MongoConnection {
    static #instance;

    constructor() {
        const env = config.NODE.ENV;
        const connectionURL = {
            develop: config.MONGO_URL_DEVELOP,
            test: config.MONGO_URL_TEST,
            production: config.MONGO_URL_PRODUCTION,
        }[env];
        if(!connectionURL){
            throw new Error (`No se ha configurado la conexión para el entorno: ${env}`)
        }
        mongoose.connect(connectionURL, {
            serverSelectionTimeoutMS: 30000, // Tiempo máximo de espera para seleccionar un servidor
        });
        logger.info(`Conectando a MongoDB en el entorno: ${env}`);
        mongoose.connect(connectionURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        mongoose.connection.once("open", ()=>{
            logger.info(`Conexión a MongoDB exitosa en el entorno: ${env}`);
        });
        mongoose.connection.on("error", (err)=>{
            logger.error(`Error de conexión a MongoDB en el entorno: ${env}, ${err.message}`);
        });
        this.connectionURL = connectionURL;

    }
    static getInstance() {
        if(!this.#instance){
            this.#instance = new MongoConnection();
        } else {
            logger.info (`Conectado usando una instancia existente de MongoDB.`);
        }
        return this.#instance;
    }
    static getSessionStore(){
        if(!this.#instance){
            throw new Error (`No se ha inicializado la conexión a MongoDB, se debe llamar a getInstance()`);
        };
        return MongoStore.create({
            mongoUrl: this.#instance.connectionURL,
            ttl: 60*60*2,
            autoRemove: "native"
        });
    };
}

export default MongoConnection