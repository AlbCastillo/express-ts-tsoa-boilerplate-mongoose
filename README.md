# Express Typescript TSOA Boilerplate Mongoose

This is a boilerplate for quickly building RESTful APIs using Node.js, Express, TSOA, and Typescript.

This template comes with many features such as JWT authentication, unit and integration tests, module generator (Model, Service, Controller), Swagger documentation, dependency injection container, error handler, logging system, and NodeJS Security Cheat Sheet.

In this branch of the boilerplate, we will use MongoDB as the database and Mongoose as the ODM.

## Table of Contents

- [Express Typescript TSOA Boilerplate Mongoose](#express-typescript-tsoa-boilerplate-mongoose)
  - [Table of Contents](#table-of-contents)
  - [Interesting Dependencies](#interesting-dependencies)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Build a New Domain Using Plop](#build-a-new-domain-using-plop)
    - [Swagger Documentation](#swagger-documentation)
    - [Husky Hook](#husky-hook)
    - [Available Scripts](#available-scripts)
    - [Src files tree](#src-files-tree)
- [Inspirations](#inspirations)
- [License](#license)

## Interesting Dependencies

- [TypeScript](https://www.typescriptlang.org/): Language
- [Express.js](https://expressjs.com/): Lightweight web server application framework
- [TSOA](https://tsoa-community.github.io/docs/getting-started.html): Clean Architecture Framework with integrated OpenAPI
- [TSyringe](https://github.com/microsoft/tsyringe): A lightweight dependency injection container for TypeScript/JavaScript for constructor injection
- [Helmet](https://helmetjs.github.io): Secure Express apps by setting HTTP headers
- [Xss](https://www.npmjs.com/package/xss): Xss ia module used to filter input from users to prevent XSS attacks
- [Hpp](https://www.npmjs.com/package/hpp): An Express middleware to protect against HTTP Parameter Pollution attacks
- [Express-rate-limit](https://www.npmjs.com/package/express-rate-limit): a basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset.
- [Lodash](https://lodash.com): Utility library
- [Mongoose](https://mongoosejs.com): MongoDB ODM
- [Swagger UI Express](https://github.com/scottie1984/swagger-ui-express): Documentation generator and hosting
- [ESLint](https://eslint.org/): Linting and formatting code
- [Dotenv](https://github.com/motdotla/dotenv): Configuration of environment variables
- [EditorConfig](https://editorconfig.org/): Maintain consistent coding style
- [Winston](https://github.com/winstonjs/winston): Logging
- [Morgan](https://github.com/expressjs/morgan#readme): HTTP request logger middleware
- [Jest](https://jestjs.io/): Testing
- [Serialize-error](https://github.com/sindresorhus/serialize-error): Serialize an Error object into a plain object
- [Supertest](https://github.com/visionmedia/supertest): High-level abstraction for testing HTTP
- [Nodemon](https://nodemon.io/): Hot reloading
- [Plop](https://plopjs.com/documentation/): Micro-generator framework to create Controllers, Models, and Services
- [Husky](https://typicode.github.io/husky/#): Commit checker

## Getting Started

### Installation

It is recommended to install the following dependencies globally:

```bash
ts-node
nodemon
tsoa
```

Install the project dependencies using yarn:

```bash
yarn install
```

Rename the file `.env.example` to `.env` (Edit the file if needed). You can use the following command:

```bash
cp .env.example .env
```

Prepare Husky hooks:

```bash
yarn prepare:husky
```

Build the TSOA routes:

```bash
yarn build
```

Run the application with live reloading:

```bash
yarn dev
```

After that, go to: `http://localhost:8080`

### Build a New Domain Using Plop

Execute the following command:

```bash
yarn plop:domain
```

Follow the instructions in the terminal.

The command will generate the following files (domain and version are prompts' inputs):

- **Model**: `src/api/v{{apiVersion}}/{{domain}}/models/{{domain}}.model.ts`
- **Schema**: `src/api/v{{apiVersion}}/{{domain}}/models/{{domain}}.schema.ts`
- **Create Dto**: `src/api/v{{apiVersion}}/{{domain}}/dto/create-{{domain}}.dto.ts`
- **Service**: `src/api/v{{apiVersion}}/{{domain}}/{{domain}}.service.ts`
- **Controller**: `src/api/v{{apiVersion}}/{{domain}}.controller.ts`

### Swagger Documentation

API Documentation is automatically generated and hosted under `/api-doc`.

To update your API Documentation, modify the file `src/swagger.json`.

Another option is to use the documentation generated with [TSOA](https://tsoa-community.github.io/docs/live-reloading.html#installing-swagger-ui-express).

### Husky Hook

**pre-commit**: Execute the command `yarn lint:fix` before committing.

Avoid the hook using `git commit -m "Your message" --no-verify`.

### NodeJS Security Cheat Sheet

This template uses the NodeJS Security Cheat Sheet from OWASP.

### Available Scripts

- `yarn build`: Build the routes and specs from TSOA and compile TypeScript.
- `yarn lint`: Lint your TypeScript code.
- `yarn lint:fix`: Lint and automatically fix your TypeScript code.
- `yarn dev`: Run the server locally.
- `yarn clean`: Remove build, tsoa_generated, and coverage folders.
- `yarn test`: Run all tests.
- `yarn test:unit`: Run unit tests.
- `yarn test:integration`: Run integration tests.
- `yarn plop:module`: Generate a new module for the API with a simple CRUD.
- `yarn prepare:husky`: Prepare Husky hooks.

### SRC files tree

```
📦src
 ┣ 📂api
 ┃ ┗ 📂v1
 ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┗ 📜create-user.dto.ts
 ┃ ┃ ┃ ┣ 📂models
 ┃ ┃ ┃ ┃ ┣ 📜user.model.ts
 ┃ ┃ ┃ ┃ ┗ 📜user.schema.ts
 ┃ ┃ ┃ ┣ 📜user.controller.ts
 ┃ ┃ ┃ ┗ 📜user.service.ts
 ┣ 📂logging
 ┃ ┗ 📜winston.logger.ts
 ┣ 📂middlewares
 ┃ ┣ 📜api.errors.ts
 ┃ ┣ 📜authentication.ts
 ┃ ┣ 📜morgan.logger.ts
 ┃ ┗ 📜sanitizer.ts
 ┣ 📂tsoa_generated(Generated with command yarn build)
 ┃ ┣ 📜routes.ts
 ┃ ┗ 📜swagger.json
 ┣ 📂utils
 ┃ ┣ 📜http.errors.ts
 ┃ ┗ 📜sum.ts
 ┣ 📜app.ts
 ┣ 📜config.ts
 ┣ 📜ioc.ts
 ┣ 📜mongoose.ts
 ┣ 📜server.ts
 ┗ 📜swagger.json
 ```

## Inspirations

- [hagopj13/node-express-boilerplate](https://github.com/hagopj13/node-express-boilerplate)
- [danielfsouse/express-rest-boilerplate](https://github.com/danielfsousa/express-rest-boilerplate)
- [vassalloandrea/better-logs-for-express](https://dev.to/vassalloandrea/better-logs-for-expressjs-using-winston-and-morgan-with-typescript-516n)
- [mert-turkmenoglu/dependency-injection-in-typescript](https://levelup.gitconnected.com/dependency-injection-in-typescript-2f66912d143c)
- [NodeJS Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html)

## License

[MIT](LICENSE.md)
