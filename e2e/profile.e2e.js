const request = require('supertest');
const createApp = require('./../src/app');
const { models } = require('./../src/db/sequelize');
const { upSeed, downSeed } = require('./utils/umzug');

describe('tests for /profile path', () => {

  let app = null;
  let server = null;
  let api = null;
  let accessToken = null;

  beforeAll(async () => {
    app = createApp();
    server = app.listen(9000);
    api = request(app);

    await upSeed();
  });

  describe('GET /my-user with admin user', () => {

    beforeAll(async () => {
      // arrange
      const user = await models.User.findByPk('1');
      const inputData = {
        email: user.email,
        password: "contrasena"
      };
      const { body: bodyLogin } = await api.post('/api/v1/auth/login').send(inputData);
      accessToken = bodyLogin.access_token;
    })

    test('Token invalid should return statusCode: 401', async () => {
      const { statusCode } = await api.get(`/api/v1/profile/my-user`).set({
        'Authorization': 'Bearer 12324314'
      });
      expect(statusCode).toEqual(401);
    });

    test('Token valid should return statusCode: 200', async () => {
      const user = await models.User.findByPk('1');
      const { statusCode, body } = await api.get('/api/v1/profile/my-user').set({
        'Authorization': `Bearer ${accessToken}`
      });

      expect(statusCode).toEqual(200);
      expect(body.email).toEqual(user.dataValues.email);
    });

    afterAll(() => {
      accessToken = null;
    })
  });

  describe('GET /my-orders', () => {
    test('should return 401', async () => {
      const { statusCode } = await api.get(`/api/v1/profile/my-orders`).set({
        'Authorization': `Bearer 121212`
      });
      expect(statusCode).toEqual(401);
    });
  });


  afterAll(async () => {
    await downSeed();
    
    server.close();
  })
});
