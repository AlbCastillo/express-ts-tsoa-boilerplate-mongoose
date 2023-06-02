require('dotenv').config();

interface Config {
	API: {
		PORT: string;
		ENV: string;
	};
	MONGO: {
		URI: string;
	};
	JWT: {
		SECRET: string;
	};
}

export const config: Config = {
	API: {
		PORT: process.env.PORT || '8080',
		ENV: process.env.ENV_LOCAL || 'local',
	},
	MONGO: {
		URI: process.env.MONGO_URI || '',
	},
	JWT: {
		SECRET: process.env.JWT_SECRET || 'your-jwt-secret',
	},
};
