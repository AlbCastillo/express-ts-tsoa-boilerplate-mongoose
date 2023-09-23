import { App } from './app';
import { CONFIG } from './config';
import { MongoDBConnection } from './mongoose';

class Server {
  private mongoConnection: MongoDBConnection;
  private appInstance: App;

  constructor(serverPort: string, mongoURI: string) {
    this.appInstance = new App(serverPort);
    this.mongoConnection = new MongoDBConnection(mongoURI);
  }
  public start(): void {
    this.mongoConnection.connectMongoDB();
    this.appInstance.listen();
  }
}

const server = new Server(CONFIG.API.PORT, CONFIG.MONGO.URI);
server.start();
