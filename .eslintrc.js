module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'jest'],
	extends: [
		'airbnb-typescript',
		'eslint:recommended',
		'plugin:prettier/recommended',
	],
	parserOptions: {
		files: '*.ts',
		project: './tsconfig.json',
	},
	env: {
		'jest/globals': true,
	},
	rules: {
		'prettier/prettier': 'warn',
		'import/prefer-default-export': 0,
		'class-methods-use-this': ['error', { exceptMethods: ['get', 'create'] }],
		'linebreak-style': ['error', 'unix'],
		'jest/no-disabled-tests': 'warn',
		'jest/no-focused-tests': 'error',
		'jest/no-identical-title': 'error',
		'jest/prefer-to-have-length': 'warn',
		'jest/valid-expect': 'error',
	},
	ignorePatterns: ['plopfile.ts', 'jest.config.js'],
};
