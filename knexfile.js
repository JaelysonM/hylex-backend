// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },
    migrations: {
      directory: "./src/database/migrations"
    },
    useNullAsDefault: true
  },
  staging: {
    client: 'mariadb',
    connection: {
      database: 'my_db',
      user:  'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: process.env.PRODUCTION_CLIENT,
    connection: {
      host: process.env.PRODUCTION_HOST,
      database: process.env.PRODUCTION_DATABASE,
      user:  process.env.PRODUCTION_USER,
      password: process.env.PRODUCTION_PASSWORD
    },
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      directory: "./src/database/migrations",
    },
  }

};
