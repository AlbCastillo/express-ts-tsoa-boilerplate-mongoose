import { CONFIG } from './config';
import { AppServer } from './server';

const server = new AppServer(CONFIG.API.PORT, CONFIG.MONGO.URI);
server.start();
