require("dotenv").config();
const pg = require("pg");

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: String(process.env.POSTGRES_PASSWORD),
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    dialectModule: require("pg"),
    dialectOptions: {},
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: String(process.env.POSTGRES_PASSWORD),
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    dialectModule: require("pg"),
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    sslmode: "require", // Pastikan SSL diaktifkan dengan sslmode=require
  },
};
