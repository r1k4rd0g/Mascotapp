import cors from 'cors'
import config from "../configEnv.js";


const allowedOrigins = [
    'http://localhost:5173',
    config.CORS_ORIGIN,
];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
}

export const corsConfig = cors(corsOptions);
