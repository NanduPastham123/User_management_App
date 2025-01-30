module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DIALECT,
  },
  test: {
    username: "root",
    password: "Wuba@1245",
    database: "user_management_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: "Wuba@1245",
    database: "user_management_prod",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
