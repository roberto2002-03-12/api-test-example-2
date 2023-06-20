const { Umzug, SequelizeStorage } = require('umzug');
const sequelize = require('../../src/db/sequelize');

const umzug = new Umzug({
  migrations: { glob: './src/db/seeders/*.js' },
  // umzug works with subQuery, meanwhile if you run
  // sequelize commands on terminal, it runs normal Queries
  // you have to add a conditional in seeders
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: undefined,
});

const upSeed = async () => {
  try {
    await sequelize.sync({ force: true });
    await umzug.up();
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