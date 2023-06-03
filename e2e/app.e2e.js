const request = require('supertest');
const createApp = require('../src/app');

describe('test for app', () => {
  let app = null;
  let server = null;
  let api = null;
  // antes de cada prueba se debe establecer el servidor
  beforeEach(() => {
    app = createApp();

    server = app.listen(9000);
    api = request(app);
  });

  test('GET /hello', async () => {
    const response = await api.get('/hello');
    expect(response).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.body.name).toEqual('Roberto');
    // expect(response.headers['content-type']).toMatch('/json/');
  });
  // como buena practica se debe cerrar el servidor una vez
  // completado la prueba
  afterEach(() => {
    server.close();
  });
});
