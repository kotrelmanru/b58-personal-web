require("dotenv").config();
const pg = require("pg");

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    dialectModule: pg,
    dialectOptions: {}, // Tidak menggunakan SSL di development
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    dialectModule: pg,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Mengizinkan sertifikat tidak terotorisasi
      },
      sslmode: "require", // Memastikan SSL mode diaktifkan
    },
  },
};
