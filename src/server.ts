import { App } from './app';
import { CONFIG } from './config';
import { MongoDBConnection } from './mongoose';

class Server {
  private port: string;
  private appInstance: App;

  constructor(port: string) {
    this.port = port;
    this.appInstance = new App(this.port);
  }

  private connectDatabase(): void {
    const mongoDatabase = new MongoDBConnection(CONFIG.MONGO.URI, CONFIG.MONGO.URI_TEST);
    mongoDatabase.connectMongoDB();
  }

  public start(): void {
    this.connectDatabase();
    this.appInstance.listen();
  }
}

const server = new Server(CONFIG.API.PORT);
server.start();
