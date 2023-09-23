import * as mongoose from 'mongoose';

import logger from './logging/winston.logger';

export class MongoDBConnection {
  private readonly mongoURI: string;

  constructor(mongoURI: string) {
    this.mongoURI = `${mongoURI}`;
  }
  /**
   * The function `connectMongoDB` connects to a MongoDB database using the provided URI and returns the
   * connection object.
   * @returns a Promise that resolves to a mongoose.Connection object.
   */
  async connectMongoDB(): Promise<mongoose.Connection> {
    try {
      // Connect to the MongoDB database using the URI from the configuration
      const dbConnection = await mongoose.connect(`${this.mongoURI}`);
      if (dbConnection) {
        return mongoose.connection;
      }
      throw new Error(`MongoDB Connection error`);
    } catch (error: any) {
      // Log an error message if the connection fails
      logger.error(`MongoDB Connection error`);
      throw new Error(error);
    } finally {
      logger.info(`MongoDB connected`);
    }
  }
}
