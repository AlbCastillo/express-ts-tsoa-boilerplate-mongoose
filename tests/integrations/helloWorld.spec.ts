import request = require('supertest');

import { AppServer } from '../../src/server';

/** IT'S RECOMMENDED CREATE A JEST SETUP FILE
 *  https://rahmanfadhil.com/test-express-with-supertest/
 */

const server = new AppServer('5555', '12345');

afterAll(done => {
  server.close();
  done();
});

describe(`GET /: Getting Hello World in JSON MESSAGE`, () => {
  it(`It should return a JSON with the message 'Hello World!!`, async () => {
    const response = await request(server)
      .get('/')
      .type('json')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual('Hello World!!');
  });
});
