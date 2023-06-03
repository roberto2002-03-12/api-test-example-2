const request = require('supertest');
const createApp = require('../src/app');

describe('test for app', () => {
  let app = null;
  let server = null;
  let api = null;

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
  });

  describe('GET /users pruebas', () => {

  });

  describe('POST /users pruebas', () => {
    test('debe retornar 400 bad request', async () => {
      // Arrange
      const inputData = {
        email: "----",
        password: "----",
      };
      // Act
      const response = await api.post('/api/v1/users').send(inputData);
      // Assert
      expect(response.statusCode).toBe(400);
    });

    test('debe retornar 400 bad request con mala contraseña', async () => {
      // Arrange
      const inputData = {
        email: "ejemplo@gmail.com",
        password: "----",
      };
      // Act
      const { statusCode, body } = await api.post('/api/v1/users').send(inputData);
      // Assert
      expect(statusCode).toBe(400);
      expect(body.message).toMatch(/password/);
    });

    test('debe retornar 400 bad request con mal email', async () => {
      // Arrange
      const inputData = {
        email: "----",
        password: "contrasena123",
      };
      // Act
      const { statusCode, body } = await api.post('/api/v1/users').send(inputData);
      // Assert
      expect(statusCode).toBe(400);
      expect(body.message).toMatch(/email/);
    });
  });

  afterEach(() => {
    server.close();
  });
});
