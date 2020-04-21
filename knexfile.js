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
    client: 'mysql',
    connection: {
      host: '177.54.149.136',
      port: 3306,
      database: 'hylex',
      user:  'root',
      password: 'To5Y+6#gl8CbO9'
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
