module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'petmatch_dev',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: 5432,
    logging: false,
    dialectOptions: {}
  },
  test: {
    username: 'postgres',
    password: 'postgres',
    database: 'petmatch_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: 5432,
    logging: false,
    dialectOptions: {}
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false,
    dialectOptions: {}
  }
};
