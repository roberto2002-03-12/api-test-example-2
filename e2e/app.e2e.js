const request = require('supertest');
const createApp = require('../src/app');

describe('test for app', () => {
  let app = null;
  let server = null;
  let api = null;
  // antes de cada prueba se debe establecer el servidor
  beforeAll(() => {
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

  test('GET /nueva-ruta 401', async () => {
    const { statusCode } = await api.get('/nueva-ruta');
    expect(statusCode).toEqual(401);
  });

  test('GET /nueva-ruta 200', async () => {
    const { statusCode } = await api.get('/nueva-ruta').set({ api: '79823' });
    expect(statusCode).toEqual(200);
  });


  afterAll(() => {
    server.close();
  });
});
