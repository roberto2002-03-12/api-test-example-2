const request = require('supertest');
const { models } = require('../src/db/sequelize')
const createApp = require('../src/app');
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

  describe('POST /LOGIN', () => {
    test('debe retornar 401 bad request con mala autenticación', async () => {
      // Arrange
      const inputData = {
        email: "fake@gmail.com",
        password: "contrasena123",
      };
      // Act
      const { statusCode } = await api.post('/api/v1/auth/login').send(inputData);
      // Assert
      expect(statusCode).toBe(401);
    });

    test('debe retornar 200 buena autenticación', async () => {
      const user = await models.User.findByPk('1');
      // Arrange
      const inputData = {
        email: user.dataValues.email,
        password: "contrasena",
      };
      // Act
      const { statusCode, body } = await api.post('/api/v1/auth/login').send(inputData);
      // Assert
      expect(statusCode).toBe(200);
      expect(body.access_token).toBeTruthy();
      expect(body.user.email).toEqual(inputData.email);
      expect(body.user.password).toBeUndefined();
    });
  });

  afterAll(async () => {
    await downSeed();
    
    server.close();
  });
});
