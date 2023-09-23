import 'reflect-metadata';
import { Server } from 'http';

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

export class App {
  public port: string;
  public app: Application;

  constructor(port: string) {
    this.port = port;
    this.app = express();
    this.config();
    this.routes();
  }

  public listen(): Server {
    return this.app.listen(this.port, () => {
      logger.debug(`APP LISTENING AT http://localhost:${this.port}`);
    });
  }
  private config(): void {
    this.app.use(
      urlencoded({
        limit: '100kb',
        extended: true,
      }),
    );

    this.app.use(json({ limit: '100kb' }));

    this.app.use(helmet());

    this.app.use(sanitizeRequest);

    this.app.use(cors());

    this.app.use(hpp());

    this.app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 50, // limit requests per windowMs
      }),
    );

    this.app.use(morganMiddlewareLogger);
  }

  private routes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      logger.info(`GETTING HELLO WORLD`);
      res.status(200).json({ message: 'Hello World!!' });
    });

    this.app.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
      return res.send(swaggerUi.generateHTML(await import('./swagger.json')));
    });

    RegisterRoutes(this.app);

    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      errorAPIHandler(err, req, res, next);
    });
  }
}
