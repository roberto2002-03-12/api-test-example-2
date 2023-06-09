const bcrypt = require('bcrypt');
const { USER_TABLE } = require('../models/user.model');

module.exports = {
  up: async (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context
    }
    const password = 'contrasena';
    const hash = await bcrypt.hash(password, 10);

    return queryInterface.bulkInsert(USER_TABLE, [{
      email: 'ejemplo2@gmail.com',
      password: hash,
      role: 'admin',
      created_at: new Date()
    }]);
  },
  down: (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context
    }
    return queryInterface.bulkDelete(USER_TABLE, null, {});
  }
};