import { Server } from 'http';

import { App } from './app';
import { MongoDBConnection } from './mongoose';

export class AppServer {
  private mongoConnection: MongoDBConnection;
  private appInstance: App;
  private expressServer: Server;

  constructor(serverPort: string, mongoURI: string) {
    this.appInstance = new App(serverPort);
    this.mongoConnection = new MongoDBConnection(mongoURI);
  }
  public start(): void {
    this.mongoConnection.connectMongoDB();
    this.expressServer = this.appInstance.listen();
  }
  public async close(): Promise<void> {
    await this.mongoConnection.closeConnection();
    if (this.expressServer) this.expressServer.close();
  }
}
