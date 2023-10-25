import { CONFIG } from './config';
import { AppServer } from './server';

const mongoURI = `mongodb://${CONFIG.MONGO.HOST}:${CONFIG.MONGO.PORT}/${CONFIG.MONGO.NAME}`;
const server = new AppServer(CONFIG.API.PORT, mongoURI);

server.start();
