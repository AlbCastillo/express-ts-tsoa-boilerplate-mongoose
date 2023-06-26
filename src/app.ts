import 'reflect-metadata';
import cors from 'cors';
import express, {
  Application,
  Response,
  Request,
  NextFunction,
  urlencoded,
  json,
} from 'express';
// eslint-disable-next-line import/no-named-as-default
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import * as swaggerUi from 'swagger-ui-express';

import logger from './logging/winston.logger';
import { errorAPIHandler } from './middlewares/api.errors';
import morganMiddlewareLogger from './middlewares/morgan.logger';
import { sanitizeRequest } from './middlewares/sanitizer';
import { RegisterRoutes } from './tsoa_generated/routes';

const app: Application = express();

// LIMIT URL SIZE: ADJUST IT TO YOUR NEEDS
app.use(
  urlencoded({
    limit: '100kb',
    extended: true,
  }),
);

// LIMIT BODY SIZE: ADJUST IT TO YOUR NEEDS
app.use(json({ limit: '100kb' }));

// HELMET: ADJUST IT YOU YOUR NEEDS
app.use(helmet());

// SANITIZE: XSS,NoSQLi
app.use(sanitizeRequest);

// CORS
app.use(cors());

// AVOID HTTP PARAMETER POLLUTION ATTACKS
app.use(hpp());

// LIMIT REQUEST PER IP: ADJUST IT TO YOUR NEEDS
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit requests per windowMs
  }),
);

// REGISTER ROUTES
RegisterRoutes(app);
app.get('/', (req, res) => {
  logger.info(`GETTING HELLO WORLD`);
  res.status(200).json({ message: 'Hello World!!' });
});

// API ERROR HANDLER
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorAPIHandler(err, req, res, next);
});

// MORGAN LOGGER
app.use(morganMiddlewareLogger);

// SWAGGER DOCUMENTATION
app.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
  return res.send(swaggerUi.generateHTML(await import('./swagger.json')));
});

export default app;
