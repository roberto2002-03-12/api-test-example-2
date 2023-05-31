const request = require('supertest');
const express = require('express');

describe('test for app', () => {
  let app = null;
  let server = null;
  let api = null;
  // antes de cada prueba se debe establecer el servidor
  beforeEach(() => {
    app = express();
    app.get('/hello', (req, res) => {
      res.status(200).json({name: 'Roberto'});
    });

    server = app.listen(9000);
    api = request(app);
  });

  test('GET /hello', async () => {
    const response = await api.get('/hello');
    expect(response).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.body.name).toEqual('Roberto');
    expect(response.headers['content-type']).toMatch('/json/');
  });
  // como buena practica se debe cerrar el servidor una vez
  // completado la prueba
  afterEach(() => {
    server.close();
  });
});
