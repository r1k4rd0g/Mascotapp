import 'dotenv/config';


export default {
    NODE_ENV: process.env.NODE_ENV,
    PERSISTENCE: process.env.PERSISTENCE,
    //PORTS:
    PORT_DEV: process.env.PORT_DEV,
    PORT_PROD: process.env.PORT_PROD,
    HOST: process.env.HOST,
    //MONGO
    MONGO_URL_DEVELOP: process.env.MONGO_URL_DEVELOP,
    MONGO_URL_TEST: process.env.MONGO_URL_TEST,
    MONGO_URL_PRODUCTION: process.env.MONGO_URL_PRODUCTION,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASS: process.env.MONGO_PASS,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,

    //MYSQL
    MYSQL_HOST_DEVELOP: process.env.MYSQL_HOST_DEVELOP,
    MYSQL_USER_DEVELOP: process.env.MYSQL_USER_DEVELOP,
    MYSQL_PASSWORD_DEVELOP: process.env.MYSQL_PASSWORD_DEVELOP,
    MYSQL_DB_NAME_DEVELOP: process.env.MYSQL_DB_NAME_DEVELOP,

    //JWT:
    SECRET_KEY_JWT: process.env.SECRET_KEY_JWT,
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,

    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
    NAME: process.env.NAME,
}