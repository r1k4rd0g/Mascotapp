import winston from 'winston'
import config from '../../config/config';

/********* - ***********************/
const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    }
}

let myTransports = [];
const environment = config.NODE_ENV

switch (environment) {
    case "develop":
        myTransports.push(
            new winston.transports.Console({
                filename: '../../utils/reports/error.log',
                level: 'debug',
                format: winston.format.combine(
                    winston.format.timestamp({
                        format: 'YYYY-MM-DD HH:mm:ss'
                    }),
                    winston.format.printf((info) => `${info.level} | ${info.timestamp}: ${info.message}`))
            })
        )
        break;
    case "production":
        myTransports.push(
            new winston.transports.File({
                filename: '../../utils/reports/errors.log',
                level: 'info',
                format: winston.format.combine(
                    winston.format.timestamp({
                        format: "YYYY-MM-DD HH:mm:ss"
                    }),
                    winston.format.printf((info) => `${info.level} | ${info.timestamp}: ${info.message}`))
            })
        )
        break;
    default:
        console.log("no se reconoce un ambiente")
}

//configuración del logger:
const logger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: myTransports
})
//console.log('que se genera en logger: ', logger)
export default logger


