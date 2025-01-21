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
                database: config.MYSQL_DATABASE_PRODUCTION,
                username: config.MYSQL_USER_PRODUCTION,
                password: config.MYSQL_PASSWORD_PRODUCTION,
                host: config.MYSQL_HOST_PRODUCTION,
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
                //logging: (msg) => logger.info('logger info de instancia Sequelize ' + msg), //registra las consultas
            }
        );
        (async()=>{
            try {
                await this.sequelize.authenticate();
                //logger.info(`Conexión a MySQL exitosa en el entorno: ${env}`);
                registerModels(this.sequelize);
                if (env === 'develop') {
                    await this.syncTables();
                }
            } catch (error) {
                logger.error(`Error de conexión a MySQL en el entorno: ${env}, ${err.message}`);
                throw err; // Detener flujo si ocurre un error
            }
        })
        //Probar la conexión
        this.sequelize
            .authenticate()
            .then(() => {
                //logger.info(`Conexión a MySQL exitosa en el entorno: ${env}`);
            })
            .catch((err) => {
                logger.error(`Error de conexión a MySQL en el entorno: ${env}, ${err.message}`);
                throw err;
            });
        this.connectionConfig = connectionConfig;

        //Registrar modelos
        registerModels(this.sequelize);

        //Sincronización opcional de tablas según entorno
        if (env === 'develop') {
            this.syncTables();
        }
    }
    static getInstance() {
        if (!this.#instance) {
            this.#instance = new MySqlConnection();
        } else {
            //logger.info('Conectado usando una instancia existente de MySQL');
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
            await this.sequelize.sync({ alter: true }); //alter: true sincroniza las tablas sin borrar datos
            //logger.info(`Tablas sincronizadas en MySQL en entorno ${env}`);
        } catch (error) {
            logger.error(`Error al sincronizar las tablas en MySQL: ${error.message}`);
        }
    }
}

export default MySqlConnection;

