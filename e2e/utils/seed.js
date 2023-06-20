const bcrypt = require('bcrypt');
const sequelize = require('../../src/db/sequelize');

// create data manually

const { models } = sequelize;

const upSeed = async () => {
  // create structure by sync, don't need
  // to use migrations since we're creating
  // all again just for some tests
  try {
    await sequelize.sync({ force: true });
    const password = 'contrasena';
    const hash = await bcrypt.hash(password, 10);
    
    await models.User.create({
      email: 'ejemplo2@gmail.com',
      password: hash,
      role: 'admin',
    });
    
    await models.Category.bulkCreate([
      {
        name: 'Category 1',
        image: 'https://api.lorem.space/image/game?w=150&h=220'
      },
      {
        name: 'Category 2',
        image: 'https://api.lorem.space/image/game?w=150&h=220'
      }
    ]);
  } catch (error) {
    console.error(error);
  }
}

const downSeed = async () => {
  await sequelize.drop();
}

module.exports = { 
  upSeed,
  downSeed,
};