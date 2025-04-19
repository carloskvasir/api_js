import { Sequelize } from 'sequelize';

const postgres_url = 'postgres://admin:admin@localhost:5432/testdb';

const sequelize = new Sequelize(postgres_url, {
  dialect: 'postgres',
  logging: false,
});

// Check database connection and version
sequelize.authenticate()
  .then(async () => {
    console.log('\x1b[32m%s\x1b[0m', '✅ OK postgres'); // Green success
    const [results] = await sequelize.query('SELECT version()');
    console.log('Postgres version:', results[0].version);
  })
  .catch(err => {
    console.error('\x1b[31m%s\x1b[0m', '❌ FAIL postgres'); // Red error
    console.error(err.message || err);
  });

export default sequelize;
