import * as dotenv from 'dotenv';
dotenv.config();

interface Config {
  API: {
    PORT: string;
    ENV: string;
  };
  MONGO: {
    URI: string;
    URI_TEST: string;
  };
  JWT: {
    SECRET: string;
  };
}

export const CONFIG: Config = {
  API: {
    PORT: process.env.PORT || '8080',
    ENV: process.env.ENV_LOCAL || 'local',
  },
  MONGO: {
    URI: process.env.MONGO_URI || '',
    URI_TEST: process.env.MONGO_URI_TEST || '',
  },
  JWT: {
    SECRET: process.env.JWT_SECRET || 'your-jwt-secret',
  },
};
