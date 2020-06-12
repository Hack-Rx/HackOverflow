const {Pool} = require("pg");
const {dbUser, dbHost, dbDatabase, dbPassword, dbPort} = process.env;


// from postgres documentation
const pool = new Pool({
  user: dbUser,
  host: dbHost,
  database: dbDatabase,
  password: dbPassword,
  port: dbPort,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;