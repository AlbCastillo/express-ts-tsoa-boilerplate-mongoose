import { config } from './config';
import app from './app';
import logger from './logging/winstonLogger';
import { connectMongoDB } from './mongoose';

const port = config.API.PORT;

/**
 * CONNECT DATABASE
 */
connectMongoDB();

/**
 * SERVER RUNNING ON
 */
const server = app.listen(port, () => {
	logger.debug(`APP LISTENING AT http://localhost:${port}`);
});

export default server;
