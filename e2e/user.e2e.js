const request = require('supertest');
const createApp = require('../src/app');
const { models } = require('../src/db/sequelize');
const { upSeed, downSeed } = require('./utils/umzug');

describe('test for app', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(async () => {
    app = createApp();
    server = app.listen(9000);
    api = request(app);

    await upSeed();
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

    // post que funcione
    test('Petition works, should return statusCode 201', async () => {
      const inputData = {
        email: 'ejemplo@gmail.com',
        password: 'contrasena',
      };
      const { statusCode, body } = await api.post('/api/v1/users').send(inputData);
      expect(statusCode).toEqual(201);
      const user = await models.User.findByPk(body.id);
      expect(user).toBeTruthy();
      // by default when you create an user is assigned with admin role
      expect(user.dataValues.role).toEqual('admin');
      expect(user.dataValues.email).toEqual(inputData.email);
    });
  });

  afterAll(async () => {
    await downSeed();

    server.close();
  });
});
