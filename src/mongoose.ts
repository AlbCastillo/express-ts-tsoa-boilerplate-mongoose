import * as mongoose from 'mongoose';
import { autoInjectable, singleton } from 'tsyringe';

import logger from './logging/winston.logger';
@singleton()
@autoInjectable()
export class MongoDBConnection {
  private readonly mongoURI: string;
  private readonly mongoURI_TEST: string;

  constructor(mongoURI: string, mongoURI_TEST: string) {
    this.mongoURI = `${mongoURI}`;
    this.mongoURI_TEST = `${mongoURI_TEST}`;
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
  /**
   * This function connects to a TEST MONGO database  using a URI and returns the connection object.
   * @returns {Promise<mongoose.Connection>} The `connectMongoDB` function returns a Promise that resolves to a `mongoose.Connection`
   * object.
   */
  async connectMongoDBTest(): Promise<mongoose.Connection> {
    try {
      // Connect to the MongoDB database using the URI from the configuration
      await mongoose
        .connect(`${this.mongoURI_TEST}`)
        // Log a message when the connection is successful
        .then(() => logger.info(`MongoDB Test connected`));
      return mongoose.connection;
    } catch (error: any) {
      // Log an error message if the connection fails
      logger.error(`MongoDB Connection error ${error.message}`);
      throw new Error(error);
    }
  }
}
