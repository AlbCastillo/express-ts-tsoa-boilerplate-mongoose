import * as mongoose from 'mongoose';

import { CONFIG } from './config';
import logger from './logging/winstonLogger';

/**
 * CONNECT TO MONGO DB
 */
export async function connectMongoDB(): Promise<mongoose.Connection> {
  try {
    await mongoose
      .connect(`${CONFIG.MONGO.URI}`)
      .then(() => logger.info(`MongoDB connected`));
    return mongoose.connection;
  } catch (error: any) {
    logger.error(`MongoDB Connection error ${error.message}`);
    throw new Error(error);
  }
}
