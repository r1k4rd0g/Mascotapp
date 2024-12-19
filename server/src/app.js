// Modules
import app from './config/server.js'
import config from './config/configEnv.js'
import logger from './utils/logger/loggerWinston.js'

// Imports


// Variables
const PORT = config.PORT_DEV
//const __dirname = import.meta.dirname
//const baseDir = path.join(__dirname, 'routes')

// Main function

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      logger.info(`🚀 Servidor iniciado en el puerto ${PORT}`);
    });
  } catch (error) {
    logger.error('Error al iniciar el servidor;', error.message);
    process.exit(1)
  }
};

startServer()