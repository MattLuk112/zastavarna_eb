import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'dev', __dirname);

export default {
    mongoUrl: process.env.mongoUrl || env.VITE_mongoUrl,
    port: process.env.port || env.VITE_port
}