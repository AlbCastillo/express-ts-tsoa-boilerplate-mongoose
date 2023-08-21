module.exports = function (plop) {
  // Domain Generator
  plop.setGenerator('domain', {
    description: 'Create TSOA Domain',
    prompts: [
      {
        type: 'input',
        name: 'version',
        message: 'Introduce the API Version (only number)',
      },
      {
        type: 'input',
        name: 'name',
        message: 'Introduce Model name(lowerCase)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/api/v{{version}}/{{name}}/dto/create-{{name}}.dto.ts',
        templateFile: 'plop-templates/create-dto.hbs',
      },
      {
        type: 'add',
        path: 'src/api/v{{version}}/{{name}}/models/{{name}}.schema.ts',
        templateFile: 'plop-templates/schema.hbs',
      },
      {
        type: 'add',
        path: 'src/api/v{{version}}/{{name}}/models/{{name}}.model.ts',
        templateFile: 'plop-templates/model.hbs',
      },
      {
        type: 'add',
        path: 'src/api/v{{version}}/{{name}}/{{name}}.service.ts',
        templateFile: 'plop-templates/service.hbs',
      },
      {
        type: 'add',
        path: 'src/api/v{{version}}/{{name}}/{{name}}.controller.ts',
        templateFile: 'plop-templates/controller.hbs',
      },
    ],
  });
}
// src/api/v1/users/models
