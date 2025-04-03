//Modules
import { Sequelize } from "sequelize";
import config from "../configEnv.js";
import logger from "../../utils/logger/loggerWinston.js";
import registerModels from "../../persistence/daos/mySql/indexModel.js";

//constante global para el entorno
const env = config.NODE_ENV;
class MySqlConnection {
    static #instance;
    constructor() {
        const connectionConfig = {
            develop: {
                database: config.MYSQL_DB_NAME_DEVELOP,
                username: config.MYSQL_USER_DEVELOP,
                password: config.MYSQL_PASSWORD_DEVELOP,
                host: config.MYSQL_HOST_DEVELOP,
                port: config.MYSQL_PORT_DEVELOP,
                dialect: 'mysql',
            },
            test: {
                database: config.MYSQL_DATABASE_TEST,
                username: config.MYSQL_USER_TEST,
                password: config.MYSQL_PASSWORD_TEST,
                host: config.MYSQL_HOST_TEST,
                dialect: 'mysql',
            },
            production: {
                database: config.MYSQL_DB_NAME_PRODUCTION,
                username: config.MYSQL_USER_PRODUCTION,
                password: config.MYSQL_PASSWORD_PRODUCTION,
                host: config.MYSQL_HOST_PRODUCTION,
                port: config.MYSQL_PORT_PRODUCTION,
                dialect: 'mysql',
            },
        }[env];

        if (!connectionConfig) {
            throw new Error(`No se ha configurado la conexión para el entorno: ${env}`)
        }

        //Crear instancia de Sequelize
        this.sequelize = new Sequelize(
            connectionConfig.database,
            connectionConfig.username,
            connectionConfig.password,
            {
                host: connectionConfig.host,
                dialect: connectionConfig.dialect,
                pool: {
                    max: 5, //max conexiones en el pool
                    min: 0,
                    acquire: 30000, //tiempo de espera en milisegundos
                    idle: 10000, //tiempo de inactividad en milisegundos
                },
                logging: false, //desactivar log de consultas - si este está activado, no se puede activar el siguiente
                /*logging: (msg) => {
                    if (msg.includes('ERROR')) {
                        logger.error('Sequelize Error: ' + msg); // Registra solo errores
                    } else if (msg.includes('SELECT') && msg.length > 200) {
                        logger.warn("Consulta Larga: " + msg);
                    }
                },*/
            }
        );
        (async()=>{
            try {
                await this.sequelize.authenticate();
                registerModels(this.sequelize);
                if (env === 'develop') {
                    await this.syncTables();
                }
            } catch (error) {
                logger.error(`Error de conexión a MySQL en el entorno: ${env}, ${error.message}`);
                throw error; // Detener flujo si ocurre un error
            }
        })(); //llamada auto ejecutable

        this.connectionConfig = connectionConfig;
        logger.info(`Conexión a MySQL establecida correctamente en el entorno: ${env}`);
        //Sincronización opcional de tablas según entorno
        if (env === 'develop') {
            this.syncTables();
        }
    }
    static getInstance() {
        if (!this.#instance) {
            this.#instance = new MySqlConnection();
        }
        return this.#instance;
    }
    //obtener instancia
    getSequelize() {
        return this.sequelize;
    }
    //cerrar conexión
    async closeConnection() {
        try {
            await this.sequelize.close();
            logger.info('Conexión a MySQL cerrada correctamente');
        } catch (err) {
            logger.error(`Error al cerrar la conexión a MySQL: ${err.message}`);
        }
    }
    //sincronizar tablas
    async syncTables() {
        try {
            await this.sequelize.sync();
            //logger.info(`Tablas sincronizadas en MySQL en entorno ${env}`);
        } catch (error) {
            logger.error(`Error al sincronizar las tablas en MySQL: ${error.message}`);
        }
    }
}

export default MySqlConnection;

