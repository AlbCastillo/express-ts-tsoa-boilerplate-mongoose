import 'reflect-metadata';
import express, { Response, Request, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import helmet from 'helmet';
import { RegisterRoutes } from './tsoa_generated/routes';
import swaggerJSON from './swagger.json';
import logger from './logging/winstonLogger';
import morganMiddlewareLogger from './middlewares/morganLogger';
import { errorAPIHandler } from './middlewares/apiErrors';

const app = express();

app.use(
	express.urlencoded({
		extended: true,
	}),
);

app.use(express.json());

app.get('/', (req, res) => {
	logger.info(`GETTING HELLO WORLD`);
	res.status(200).json({ message: 'Hello World!!' });
});

/**
 * REGISTER ROUTES FROM TSOA
 */
RegisterRoutes(app);

/**
 * MIDDLEWARES
 */
// CORS
app.use(cors());

// API ERROR HANDLER
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	errorAPIHandler(err, req, res, next);
});

// MORGAN LOGGER
app.use(morganMiddlewareLogger);

// HELMET
app.use(helmet());

// SWAGGER DOCUMENTATION

app.use(
	'/api-doc',

	swaggerUi.serveWithOptions({
		redirect: false,
	}),

	swaggerUi.setup(swaggerJSON),
);

// export default server;
export default app;
