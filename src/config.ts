require('dotenv').config();

interface Config {
  API: {
    PORT: string;
    ENV: string;
    APP_NAME: string;
  };
  MONGO: {
    NAME: string;
    HOST: string;
    PORT: string;
  };
  JWT: {
    SECRET: string;
  };
}

export const CONFIG: Config = {
  API: {
    PORT: process.env.PORT || '8080',
    ENV: process.env.ENV_LOCAL || 'local',
    APP_NAME: process.env.APP_NAME || 'my-app',
  },
  MONGO: {
    NAME: process.env.MONGO_NAME || 'my_database',
    HOST: process.env.MONGO_HOST || 'localhost',
    PORT: process.env.MONGO_PORT || '27017',
  },
  JWT: {
    SECRET: process.env.JWT_SECRET || 'your-jwt-secret',
  },
};
